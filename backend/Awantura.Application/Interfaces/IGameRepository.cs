using Awantura.Domain.Entities;
using Awantura.Domain.Models;

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
