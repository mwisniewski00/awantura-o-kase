using Awantura.Domain.Entities;
using Awantura.Domain.Models;
using Awantura.Domain.Models.Auth;

namespace Awantura.Application.Interfaces
{
    public interface IGameRepository
    {
        Task<Guid> CreateNewGame(Guid playerId);
        Task<CustomMessageResult> AddPlayerToGame(Guid gameId, PlayerDto playerId);
        Task<CustomMessageResult> StartGame(Guid gameId);
        Task<Game> GetGame(Guid gameId, string playerId);
        Task<bool> SetPlayerReady(Guid gameId, Guid playerId);
    }
}
