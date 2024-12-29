using Awantura.Application.Models;

namespace Awantura.Application.Interfaces
{
    public interface IGameRepository
    {
        Task<Guid> CreateNewGame(Guid playerId);
        Task<CustomMessageResult> AddPlayerToGame(Guid gameId, Guid playerId);
        Task<CustomMessageResult> StartGame(Guid gameId);
    }
}
