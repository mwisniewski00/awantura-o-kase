using Microsoft.AspNetCore.Identity;

namespace Awantura.Domain.Entities
{
    public class GameParticipants
    {
        public Guid Id { get; set; }
        public Guid BluePlayerId { get; set; }
        public Guid GreenPlayerId { get; set; }
        public Guid YellowPlayerId { get; set; }

        public Guid GameId { get; set; }
        public Game Game { get; set; }
    }
}
