using Awantura.Application.Hubs;
using Awantura.Application.Interfaces;
using Awantura.Application.Models;
using Awantura.Domain.Entities;
using Awantura.Domain.Enums;
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

            var game = new Game
            {
                Id = gameId,
                GameState = GameState.NotStarted,
                Round = 0,
                PlayerScores = new List<PlayerGameScore>
                {
                    new PlayerGameScore
                    {
                        GameId = gameId,
                        PlayerId = playerId,
                        CurrentPoints = 0
                    }
                },
                GameParticipants = new GameParticipants
                {
                    Id = Guid.NewGuid(),
                    BluePlayerId = playerId,
                    GreenPlayerId = null,
                    YellowPlayerId = null,
                    GameId = gameId
                }
            };

            _context.Games.Add(game);
            await _context.SaveChangesAsync();
            return gameId;
        }

        public async Task<CustomMessageResult> AddPlayerToGame(Guid gameId, Guid playerId)
        {
            var game = await _context.Games
                .Include(g => g.GameParticipants)
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

            if (participants.BluePlayerId == playerId || participants.GreenPlayerId == playerId || participants.YellowPlayerId == playerId)
            {
                return new CustomMessageResult
                {
                    Success = false,
                    Message = "Player is already in the game."
                };
            }

            if (participants.GreenPlayerId == Guid.Empty)
                participants.GreenPlayerId = playerId;
            else if (participants.YellowPlayerId == Guid.Empty)
                participants.YellowPlayerId = playerId;
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
                PlayerId = playerId,
                CurrentPoints = 0
            };

            _context.PlayerGameScores.Add(playerGameScore);

            await _context.SaveChangesAsync();

            await _hubContext.Clients.Group(gameId.ToString().ToLower()).SendAsync("PlayerJoined", playerId);

            return new CustomMessageResult
            {
                Success = true,
                Message = "Player added to the game successfully."
            };
        }

        public async Task<CustomMessageResult> StartGame(Guid gameId)
        {
            var game = await _context.Games
               .FirstOrDefaultAsync(g => g.Id == gameId);

            if (game == null)
            {
                return new CustomMessageResult
                {
                    Success = false,
                    Message = "Game guid is incorrect, it doesn't exsist."
                };
            }


            if (game.GameState == GameState.NotStarted)
            {
                game.GameState = GameState.CATEGORY_DRAW;
                game.Round = 1;
            }
            else
            {
                return new CustomMessageResult
                {
                    Success = false,
                    Message = "Game have already started!"
                };
            }

            await _context.SaveChangesAsync();

            await _hubContext.Clients.Group(gameId.ToString().ToLower()).SendAsync("GameStarted", gameId);

            return new CustomMessageResult
            {
                Success = true,
                Message = $"Game {game.Id} started!"
            };
        }

        public async Task<Game> GetGame(Guid gameId, string playerId)
        {
            var game = await _context.Games.Include(g => g.GameParticipants)
               .FirstOrDefaultAsync(g => g.Id == gameId);

            if (game == null)
            {
                return null;
            }

            var participants = game.GameParticipants;
            var playerGuid = new Guid(playerId);

            if (participants.BluePlayerId == playerGuid || participants.GreenPlayerId == playerGuid || participants.YellowPlayerId == playerGuid)
            {
                return game;
            }

            // Player is not a participant of game
            return null;
        }
    }
}
