using Awantura.Application.Models;
using Awantura.Domain.Entities;

namespace Awantura.Application.Interfaces
{
    public interface IGameRepository
    {
        Task<Guid> CreateNewGame(Guid playerId);
        Task<CustomMessageResult> AddPlayerToGame(Guid gameId, Guid playerId);
        Task<CustomMessageResult> StartGame(Guid gameId);
        Task<Game> GetGame(Guid gameId, string playerId);
    }
}
