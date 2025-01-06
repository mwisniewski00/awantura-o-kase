using Awantura.Application.Hubs;
using Awantura.Application.Interfaces;
using Awantura.Domain.Entities;
using Awantura.Domain.Enums;
using Awantura.Domain.Models;
using Awantura.Domain.Models.Dtos;
using Awantura.Infrastructure.Data;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Awantura.Infrastructure.Services
{
    public class BidRepository : IBidRepository
    {
        private readonly AwanturaAuthDbContext _context;
        private readonly IHubContext<GameHub> _hubContext;

        public BidRepository(AwanturaAuthDbContext context, IHubContext<GameHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        public async Task<CustomMessageResult> MakeBid(Guid gameId, Guid playerId, int bidAmount)
        {
            if (!IsBidAmountValid(bidAmount))
                return CreateErrorResult("Bid amount must be divisible by 100.");

            var game = await GetGame(gameId);
            if (game == null)
                return CreateErrorResult("Game not found.");

            if (!IsBiddingPhaseActive(game))
                return CreateErrorResult("Bidding is not active in this game.");

            var playerScore = GetPlayerScore(game, playerId);
            if (playerScore == null)
                return CreateErrorResult("Player not found in the game.");

            if (!HasSufficientFunds(playerScore, bidAmount))
                return CreateErrorResult("Insufficient funds to make this bid.");

            var highestBid = await GetHighestBid(gameId);

            if (IsBiddingTimePassed(highestBid))
            {
                return CreateErrorResult("Too late! Time for bidding have passed.");
            };

            var highestBidAmount = 0;
            if (highestBid != null)
                highestBidAmount = highestBid.Amount;

            if (!IsBidHigherThanCurrentHighest(bidAmount, highestBidAmount))
                return CreateErrorResult("Bid amount must be higher than the current highest bid.");

            var currentUserBid = await GetCurrentUserBid(gameId, playerId);
            var currentUserBidAmount = 0;
            if (currentUserBid != null)
            {
                currentUserBidAmount = currentUserBid.Amount;
                _context.Bids.Remove(currentUserBid);
            }

            var bid = CreateNewBid(gameId, playerId, bidAmount);
            _context.Bids.Add(bid);

            var bidIncrease = bidAmount - currentUserBidAmount;
            game.Pool += bidIncrease;
            playerScore.Balance -= bidIncrease;

            await _context.SaveChangesAsync();

            var signalRGroup = _hubContext.Clients.Group(gameId.ToString().ToLower());
            var bidDoneEventDto = new BidDoneEventDto
            {
                PlayerId = playerId,
                NewAccountBalance = playerScore.Balance,
                NewPool = game.Pool,
                Timestamp = bid.TimeStamp,
                Amount = bid.Amount
            };
            await signalRGroup.SendAsync("BidDone", bidDoneEventDto);
            return CreateSuccessResult($"Bid placed successfully: Player: {playerId}, Offer: {bidAmount}");
        }

        public async Task<CustomMessageResult> EndBidding(Guid gameId)
        {
            var game = await GetGameWithQuestions(gameId);
            if (game == null)
                return CreateErrorResult("Game not found.");

            if (!IsBiddingPhaseActive(game))
                return CreateErrorResult("Bidding phase is not active.");

            var lastBid = await GetLastBid(gameId);
            if (!IsBiddingTimePassed(lastBid))
                return CreateErrorResult("Bidding phase cannot be ended. Less than 10 seconds since the last bid.");

            var highestBid = await GetHighestBid(gameId);

            var highestBidder = game.PlayerScores.Where(p => p.PlayerId == highestBid.PlayerId).FirstOrDefault();
            if (highestBidder == null)
                return CreateErrorResult("Coudn't find the highest bidder.");

            game.GameState = GameState.QUESTION;
            await _context.SaveChangesAsync();

            var currentQuestion = game.Questions.ElementAtOrDefault(game.Round - 1);
            var biddingEndEventDto = new BiddingEndEventDto
            {
                QuestionText = currentQuestion.QuestionText,
                Answers = currentQuestion.Answers.Split(";").ToList()
            };
            var signalRGroup = _hubContext.Clients.Group(gameId.ToString().ToLower());
            await signalRGroup.SendAsync("BiddingEnd", biddingEndEventDto);

            return new CustomMessageResult
            {
                Success = true,
                Message = "Bidding phase ended. Proceeding to question phase.",
                Obj = CreateBidResult(highestBid)
            };
        }

        #region Helper Methods

        private async Task<Game?> GetGame(Guid gameId)
        {
            return await _context.Games
                .Include(g => g.PlayerScores)
                .Include(g => g.GameParticipants)
                .FirstOrDefaultAsync(g => g.Id == gameId);
        }

        private async Task<Game?> GetGameWithQuestions(Guid gameId)
        {
            return await _context.Games
                .Include(g => g.PlayerScores)
                .Include(g => g.GameParticipants)
                .Include(g => g.Questions)
                .FirstOrDefaultAsync(g => g.Id == gameId);
        }

        private PlayerGameScore? GetPlayerScore(Game game, Guid playerId)
        {
            return game.PlayerScores.FirstOrDefault(ps => ps.PlayerId == playerId);
        }

        private async Task<Bid?> GetHighestBid(Guid gameId)
        {
            return await _context.Bids
                .Where(b => b.GameId == gameId)
                .OrderByDescending(b => b.Amount)
                .FirstOrDefaultAsync();
        }

        private async Task<Bid?> GetLastBid(Guid gameId)
        {
            return await _context.Bids
                .Where(b => b.GameId == gameId)
                .OrderByDescending(b => b.TimeStamp)
                .FirstOrDefaultAsync();
        }

        private async Task<Bid?> GetCurrentUserBid(Guid gameId, Guid playerId)
        {
            return await _context.Bids
                .Where(b => b.GameId == gameId && b.PlayerId == playerId)
                .FirstOrDefaultAsync();
        }

        private bool IsBidAmountValid(int bidAmount)
        {
            return bidAmount % 100 == 0;
        }

        private bool IsBiddingPhaseActive(Game game)
        {
            return game.GameState == GameState.BIDDING;
        }

        private bool HasSufficientFunds(PlayerGameScore playerScore, int bidAmount)
        {
            return playerScore.Balance >= bidAmount;
        }

        private bool IsBidHigherThanCurrentHighest(int bidAmount, int highestBidAmount)
        {
            return bidAmount > highestBidAmount;
        }

        private bool IsBiddingTimePassed(Bid? lastBid)
        {
            return lastBid != null && (DateTime.UtcNow - lastBid.TimeStamp).TotalSeconds > 10;
        }

        private Bid CreateNewBid(Guid gameId, Guid playerId, int bidAmount)
        {
            return new Bid
            {
                GameId = gameId,
                PlayerId = playerId,
                Amount = bidAmount,
                TimeStamp = DateTime.UtcNow
            };
        }

        private void CleanBidsForGame(Guid gameId)
        {
            _context.Bids.RemoveRange(_context.Bids.Where(b => b.GameId == gameId));
        }

        private CustomMessageResult CreateErrorResult(string message)
        {
            return new CustomMessageResult
            {
                Success = false,
                Message = message
            };
        }

        private CustomMessageResult CreateSuccessResult(string message)
        {
            return new CustomMessageResult
            {
                Success = true,
                Message = message
            };
        }

        private BidResult CreateBidResult(Bid? highestBid)
        {
            return new BidResult
            {
                PlayerId = highestBid?.PlayerId,
                Amount = highestBid?.Amount
            };
        }

        #endregion
    }

    public class BidResult
    {
        public Guid? PlayerId { get; set; }
        public decimal? Amount { get; set; }
    }
}