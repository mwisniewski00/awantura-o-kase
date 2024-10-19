using Awantura.Domain.Enums;

namespace Awantura.Domain.Entities
{
    public class Answers
    {
        public Guid GameId { get; set; }
        public Guid PlayerId { get; set; }
        public Answer PlayerAnswer { get; set; }
        public bool IsCorrect { get; set; }
        public int PointsForAnswer { get; set; }
    }
}
