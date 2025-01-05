namespace Awantura.Domain.Entities
{
    public class PlayerGameScore
    {
        public Guid GameId { get; set; }
        public Guid PlayerId { get; set; }
        public int Points { get; set; }
        public int Balance { get; set; }

        public Game Game { get; set; }
    }
}