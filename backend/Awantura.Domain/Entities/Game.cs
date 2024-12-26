using Awantura.Domain.Enums;

namespace Awantura.Domain.Entities
{
    public class Game
    {
        public Guid Id { get; set; }
        public GameState GameState { get; set; }
        public int Round {  get; set; }
    }
}