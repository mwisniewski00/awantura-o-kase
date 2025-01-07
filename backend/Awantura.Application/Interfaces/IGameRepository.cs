using Awantura.Domain.Models;
using Awantura.Domain.Models.Auth;
using Awantura.Domain.Models.Dtos;

namespace Awantura.Application.Interfaces
{
    public interface IGameRepository
    {
        Task<Guid> CreateNewGame(Guid playerId);
        Task<CustomMessageResult> AddPlayerToGame(Guid gameId, PlayerDto playerId);
        Task<GameInfoDto?> GetGame(Guid gameId, string playerId);
        Task<bool> SetPlayerReady(Guid gameId, Guid playerId);
        Task<CustomMessageResult> AnswerQuestion(Guid gameId, Guid playerId, int answerIndex);
    }
}
