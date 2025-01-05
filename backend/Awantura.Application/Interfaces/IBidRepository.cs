using Awantura.Domain.Models;

namespace Awantura.Application.Interfaces
{
    public interface IBidRepository
    {
        Task<CustomMessageResult> MakeBid(Guid gameId, Guid playerId, int bidAmount);
        Task<CustomMessageResult> EndBidding(Guid gameId);
    }
}