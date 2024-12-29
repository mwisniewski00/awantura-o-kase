using Microsoft.AspNetCore.Identity;

namespace Awantura.Domain.Entities
{
    public class PlayerGameScore
    {
        public Guid GameId { get; set; }
        public Guid PlayerId { get; set; }
        public int CurrentPoints { get; set; }

        public Game Game { get; set; }
    }
}
