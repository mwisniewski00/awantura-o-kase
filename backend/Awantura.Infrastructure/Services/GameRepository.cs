using Awantura.Application.Hubs;
using Awantura.Application.Interfaces;
using Awantura.Domain.Entities;
using Awantura.Domain.Enums;
using Awantura.Domain.Models;
using Awantura.Domain.Models.Auth;
using Awantura.Domain.Models.Dtos;
using Awantura.Infrastructure.Data;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Awantura.Infrastructure.Services
{
    public class GameRepository : IGameRepository
    {
        private readonly AwanturaAuthDbContext _context;
        private readonly IHubContext<GameHub> _hubContext;

        public GameRepository(AwanturaAuthDbContext context, IHubContext<GameHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        public async Task<Guid> CreateNewGame(Guid playerId)
        {
            var gameId = Guid.NewGuid();
            var questions = await _context.Questions
                .OrderBy(q => Guid.NewGuid())
                .Take(7)
                .ToListAsync();

            var game = new Game
            {
                Id = gameId,
                GameState = GameState.NotStarted,
                Pool = 0,
                Round = 0,
                Questions = questions,
                PlayerScores = new List<PlayerGameScore>
                {
                    new PlayerGameScore
                    {
                        GameId = gameId,
                        PlayerId = playerId,
                        Points = 0,
                        Balance = 10000
                    }
                },
                GameParticipants = new GameParticipants
                {
                    Id = Guid.NewGuid(),
                    BluePlayerId = playerId,
                    isBluePlayerReady = false,
                    GreenPlayerId = null,
                    isGreenPlayerReady = false,
                    YellowPlayerId = null,
                    isYellowPlayerReady = false,
                    GameId = gameId
                }
            };

            _context.Games.Add(game);
            await _context.SaveChangesAsync();
            return gameId;
        }

        public async Task<CustomMessageResult> AddPlayerToGame(Guid gameId, PlayerDto player)
        {
            var game = await _context.Games
                .Include(g => g.GameParticipants)
                .Include(g => g.Questions)
                .FirstOrDefaultAsync(g => g.Id == gameId);

            if (game == null)
            {
                return new CustomMessageResult
                {
                    Success = false,
                    Message = "Game not found."
                };
            }

            var participants = game.GameParticipants;

            if (participants.BluePlayerId == player.Id || participants.GreenPlayerId == player.Id || participants.YellowPlayerId == player.Id)
            {
                return new CustomMessageResult
                {
                    Success = true,
                    Message = "Player is already in the game."
                };
            }

            if (participants.GreenPlayerId == null)
                participants.GreenPlayerId = player.Id;
            else if (participants.YellowPlayerId == null)
                participants.YellowPlayerId = player.Id;
            else
            {
                return new CustomMessageResult
                {
                    Success = false,
                    Message = "No available slots in the game."
                };
            }

            var playerGameScore = new PlayerGameScore
            {
                GameId = gameId,
                PlayerId = player.Id,
                Points = 0,
                Balance = 10000
            };

            _context.PlayerGameScores.Add(playerGameScore);

            var isStartingGame = player.Id == participants.YellowPlayerId;
            if (isStartingGame)
            {
                game.Round++;
                game.GameState = GameState.CATEGORY_DRAW;
            }

            await _context.SaveChangesAsync();

            PlayerJoinedDto playerJoinedEvent = new PlayerJoinedDto
            {
                Id = player.Id,
                Username = player.UserName,
                PlayerColor = participants.GreenPlayerId == player.Id ? "green" : "yellow"
            };

            await SendEventToGameGroup(gameId, "PlayerJoined", playerJoinedEvent);

            if (isStartingGame)
            {
                var currentQuestion = GetCurrentQuestion(game);
                RoundStartedDto roundStartedDto = new RoundStartedDto
                {
                    RoundNumber = game.Round,
                    Category = currentQuestion.Category
                };
                await SendEventToGameGroup(gameId, "RoundStarted", roundStartedDto);
            }

            return new CustomMessageResult
            {
                Success = true,
                Message = "Player added to the game successfully."
            };
        }

        public async Task<GameInfoDto> GetGame(Guid gameId, string playerId)
        {
            var game = await _context.Games
                .Include(g => g.GameParticipants)
                .Include(g => g.Questions)
                .Include(g => g.PlayerScores)
                .FirstOrDefaultAsync(g => g.Id == gameId);

            if (game == null)
                return null;

            var participants = game.GameParticipants;
            var playerGuid = new Guid(playerId);

            if (participants.BluePlayerId != playerGuid && participants.GreenPlayerId != playerGuid && participants.YellowPlayerId != playerGuid)
                return null;

            var currentQuestion = GetCurrentQuestion(game);

            var gameBids = await GetGameBids(gameId);

            if (game.GameState == GameState.NotStarted)
            {
                return new GameInfoDto
                {
                    Id = game.Id,
                    Round = game.Round,
                    GameState = game.GameState,
                    Category = null,
                    Question = null,
                    Answers = null,
                    GameParticipants = game.GameParticipants,
                    Pool = game.Pool,
                    PlayerGameScores = game.PlayerScores.ToList(),
                    Bids = gameBids
                };
            }
            else if (game.GameState == GameState.CATEGORY_DRAW)
            {
                return new GameInfoDto
                {
                    Id = game.Id,
                    Round = game.Round,
                    GameState = game.GameState,
                    Category = currentQuestion.Category,
                    Question = null,
                    Answers = null,
                    GameParticipants = game.GameParticipants,
                    Pool = game.Pool,
                    PlayerGameScores = game.PlayerScores.ToList(),
                    Bids = gameBids
                };
            }
            else if (game.GameState == GameState.BIDDING)
            {
                return new GameInfoDto
                {
                    Id = game.Id,
                    Round = game.Round,
                    GameState = game.GameState,
                    Category = currentQuestion.Category,
                    Question = null,
                    Answers = null,
                    GameParticipants = game.GameParticipants,
                    Pool = game.Pool,
                    PlayerGameScores = game.PlayerScores.ToList(),
                    Bids = gameBids
                };
            }
            else if (game.GameState == GameState.QUESTION || game.GameState == GameState.FINISHED)
            {
                return new GameInfoDto
                {
                    Id = game.Id,
                    Round = game.Round,
                    GameState = game.GameState,
                    Category = currentQuestion.Category,
                    Question = currentQuestion.QuestionText,
                    Answers = currentQuestion.Answers.Split(";").ToList(),
                    GameParticipants = game.GameParticipants,
                    Pool = game.Pool,
                    PlayerGameScores = game.PlayerScores.ToList(),
                    Bids = gameBids
                };
            }

            throw new ArgumentException("Wrong Game State!");
        }

        public async Task<bool> SetPlayerReady(Guid gameId, Guid playerId)
        {
            var game = await _context.Games
                .Include(g => g.GameParticipants)
                .Include(g => g.PlayerScores)
                .FirstOrDefaultAsync(g => g.Id == gameId);

            if (game == null)
                return false;

            if (game.GameParticipants.BluePlayerId == playerId)
                game.GameParticipants.isBluePlayerReady = true;
            else if (game.GameParticipants.GreenPlayerId == playerId)
                game.GameParticipants.isGreenPlayerReady = true;
            else if (game.GameParticipants.YellowPlayerId == playerId)
                game.GameParticipants.isYellowPlayerReady = true;
            else
                return false;

            var areAllPlayersReady = game.GameParticipants.isBluePlayerReady && game.GameParticipants.isGreenPlayerReady && game.GameParticipants.isYellowPlayerReady;
            var newRoundBids = new List<Bid>();
            if (areAllPlayersReady)
            {
                game.GameState = GameState.BIDDING;

                //Add funds to game pool
                foreach (var playerScore in game.PlayerScores)
                {
                    var amountToBid = playerScore.Balance >= 500 ? 500 : playerScore.Balance;
                    playerScore.Balance -= amountToBid;
                    game.Pool += amountToBid;
                    var newBid = new Bid
                    {
                        GameId = gameId,
                        PlayerId = playerScore.PlayerId,
                        Amount = amountToBid,
                        TimeStamp = DateTime.UtcNow
                    };
                    _context.Bids.Add(newBid);
                    newRoundBids.Add(newBid);
                }
            }
            await _context.SaveChangesAsync();

            await SendEventToGameGroup(gameId, "PlayerReady", playerId);
            if (areAllPlayersReady)
            {
                var StartBiddingEventDto = new StartBiddingEventDto
                {
                    Pool = game.Pool,
                    PlayerGameScores = game.PlayerScores.ToList(),
                    Bids = newRoundBids
                };
                await SendEventToGameGroup(gameId, "StartBidding", StartBiddingEventDto);
            }
            return true;
        }

        public async Task<CustomMessageResult> AnswerQuestion(Guid gameId, Guid playerId, int answerIndex)
        {
            var game = await _context.Games
                .Include(g => g.PlayerScores)
                .Include(g => g.Questions)
                .Include(g => g.GameParticipants)
                .FirstOrDefaultAsync(g => g.Id == gameId);
            if (game == null)
            {
                return new CustomMessageResult()
                {
                    Success = false,
                    Message = "Game not found."
                };
            }
            if (game.GameState != GameState.QUESTION)
            {
                return new CustomMessageResult()
                {
                    Success = false,
                    Message = "You cannot answer the question in this game phase."
                };
            }
            var highestBid = await GetHighestBid(gameId);
            if (highestBid == null)
            {
                return new CustomMessageResult()
                {
                    Success = false,
                    Message = "No bids found for the game. Can't determine winner of bidding."
                };
            }
            if (highestBid.PlayerId != playerId)
            {
                return new CustomMessageResult()
                {
                    Success = false,
                    Message = "You cannot answer the question. You didn't win bidding."
                };
            }
            var currentQuestion = GetCurrentQuestion(game);
            if (currentQuestion == null)
            {
                return new CustomMessageResult()
                {
                    Success = false,
                    Message = "Couldn't find a question for current round of game. Probably error occured when creating game."
                };
            }
            var isAnswerCorrect = currentQuestion != null && currentQuestion.CorrectAnswer == answerIndex;
            var playerScore = game.PlayerScores.Where(p => p.PlayerId == playerId).FirstOrDefault();
            if (playerScore == null)
            {
                return new CustomMessageResult()
                {
                    Success = false,
                    Message = "Couldn't find a playerScore for user account. Probably error occured when creating game."
                };
            }
            if (isAnswerCorrect)
            {
                playerScore.Balance += game.Pool;
                game.Pool = 0;
            }
            game.GameState = game.Round == 7 ? GameState.FINISHED : GameState.CATEGORY_DRAW;
            if (game.Round < 7){
                game.Round++;
            }
            CleanBidsForGame(gameId);
            ResetGameReadiness(game);
            await _context.SaveChangesAsync();
            var newQuestion = GetCurrentQuestion(game);
            var questionAnswerEventDto = new QuestionAnswerEventDto()
            {
                AnsweringPlayerId = playerId,
                NewPool = game.Pool,
                NewAccountBalance = playerScore.Balance,
                IsAnswerCorrect = isAnswerCorrect,
                NewQuestionCategory = newQuestion.Category
            };
            await SendEventToGameGroup(gameId, "QuestionAnswer", questionAnswerEventDto);
            return new CustomMessageResult()
            {
                Success = true,
                Message = "Question answer processed correctly."
            };
        }

        #region Helper methods

        private async Task SendEventToGameGroup(Guid gameId, string eventName, Object eventBody)
        {
            var signalRGroup = _hubContext.Clients.Group(gameId.ToString().ToLower());
            await signalRGroup.SendAsync(eventName, eventBody);
        }

        private Question? GetCurrentQuestion(Game game)
        {
            return game.Questions.ElementAtOrDefault(game.Round - 1);
        }

        private async Task<List<Bid>> GetGameBids(Guid gameId)
        {
            return await _context.Bids
                .Where(b => b.GameId == gameId)
                .OrderByDescending(b => b.Amount)
                .ToListAsync();
        }

        private async Task<Bid?> GetHighestBid(Guid gameId)
        {
            return await _context.Bids
                .Where(b => b.GameId == gameId)
                .OrderByDescending(b => b.Amount)
                .FirstOrDefaultAsync();
        }

        private void CleanBidsForGame(Guid gameId)
        {
            _context.Bids.RemoveRange(_context.Bids.Where(b => b.GameId == gameId));
        }

        private void ResetGameReadiness(Game game)
        {
            game.GameParticipants.isBluePlayerReady = false;
            game.GameParticipants.isGreenPlayerReady = false;
            game.GameParticipants.isYellowPlayerReady = false;
        }

        #endregion
    }
}
