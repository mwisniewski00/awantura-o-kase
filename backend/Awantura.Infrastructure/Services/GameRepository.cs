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

            var signalRGroup = _hubContext.Clients.Group(gameId.ToString().ToLower());
            await signalRGroup.SendAsync("PlayerJoined", playerJoinedEvent);

            if (isStartingGame)
            {
                var currentQuestion = game.Questions.ElementAtOrDefault(game.Round - 1);
                RoundStartedDto roundStartedDto = new RoundStartedDto
                {
                    RoundNumber = game.Round,
                    Category = currentQuestion.Category
                };
                await signalRGroup.SendAsync("RoundStarted", roundStartedDto);
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
                .FirstOrDefaultAsync(g => g.Id == gameId);

            if (game == null)
                return null;

            var participants = game.GameParticipants;
            var playerGuid = new Guid(playerId);

            if (participants.BluePlayerId != playerGuid && participants.GreenPlayerId != playerGuid && participants.YellowPlayerId != playerGuid)
                return null;

            var currentQuestion = game.Questions.ElementAtOrDefault(game.Round - 1);

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
                    GameParticipants = game.GameParticipants
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
                    GameParticipants = game.GameParticipants
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
                    GameParticipants = game.GameParticipants
                };
            }
            else if (game.GameState == GameState.QUESTION)
            {
                return new GameInfoDto
                {
                    Id = game.Id,
                    Round = game.Round,
                    GameState = game.GameState,
                    Category = currentQuestion.Category,
                    Question = currentQuestion.QuestionText,
                    Answers = currentQuestion.Answers.Split(";").ToList(),
                    GameParticipants = game.GameParticipants
                };
            }

            throw new ArgumentException("Wrong Game State!");
        }

        public async Task<bool> SetPlayerReady(Guid gameId, Guid playerId)
        {
            var game = await _context.Games
                .Include(g => g.GameParticipants)
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
            if (areAllPlayersReady)
            {
                game.GameState = GameState.BIDDING;
            }
            await _context.SaveChangesAsync();

            var signalRGroup = _hubContext.Clients.Group(gameId.ToString().ToLower());
            await signalRGroup.SendAsync("PlayerReady", playerId);
            if (areAllPlayersReady)
            {
                await signalRGroup.SendAsync("AllPlayersReady");
            }
            return true;
        }

        public async Task ProgressGameState(Guid gameId)
        {
            var game = await _context.Games
                .Include(g => g.GameParticipants)
                .FirstOrDefaultAsync(g => g.Id == gameId);

            if (game == null)
                return;

            if (game.GameState == GameState.QUESTION)
            {
                if (game.Round == 7)
                    game.GameState = GameState.FINISHED;
                else
                {
                    game.Round++;
                    game.GameState = GameState.CATEGORY_DRAW;
                }
            }
            else
            {
                game.GameState++;
            }

            await _context.SaveChangesAsync();
        }
    }
}
