using Awantura.Domain.Enums;

namespace Awantura.Domain.Entities
{
    public class Game
    {
        public Guid Id { get; set; }
        public GameState GameState { get; set; }
        public int Round {  get; set; }

        public ICollection<Question> Questions { get; set; }

        public ICollection<PlayerGameScore> PlayerScores { get; set; }

        public GameParticipants GameParticipants { get; set; }
    }
}