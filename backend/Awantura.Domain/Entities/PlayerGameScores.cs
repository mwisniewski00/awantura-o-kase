namespace Awantura.Domain.Entities
{
    public class PlayerGameScores
    {
        public Guid GameId { get; set; }
        public Guid PlayerId { get; set; }
        public int CurrentPoints { get; set; }
    }
}
