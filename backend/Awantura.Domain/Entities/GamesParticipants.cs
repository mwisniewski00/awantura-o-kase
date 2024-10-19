namespace Awantura.Domain.Entities
{
    public class GameParticipants
    {
        public Guid GameId { get; set; }
        public Guid PlayerId { get; set; }
        public int Points { get; set; }
    }
}
