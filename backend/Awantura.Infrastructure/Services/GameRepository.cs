﻿using Awantura.Application.Interfaces;
using Awantura.Application.Models;
using Awantura.Domain.Entities;
using Awantura.Domain.Enums;
using Awantura.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Awantura.Application.Services
{
    public class GameRepository : IGameRepository
    {
        private readonly AwanturaAuthDbContext _context;

        public GameRepository(AwanturaAuthDbContext context)
        {
            _context = context;
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
                    GreenPlayerId = Guid.Empty,
                    YellowPlayerId = Guid.Empty,
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
                game.GameState = GameState.FirstRound;
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
            return new CustomMessageResult
            {
                Success = true,
                Message = $"Game {game.Id} started!"
            };
        }
    }
}
