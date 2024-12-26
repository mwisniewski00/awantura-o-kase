using Awantura.Domain.Enums;

namespace Awantura.Domain.Entities
{
    public class Answer
    {
        public Guid GameId { get; set; }
        public Guid PlayerId { get; set; }
        public Enums.Answer PlayerAnswer { get; set; }
        public bool IsCorrect { get; set; }
        public int PointsForAnswer { get; set; }
    }
}
