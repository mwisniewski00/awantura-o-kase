namespace Awantura.Domain.Entities
{
    public class GameParticipants
    {
        public Guid GameId { get; set; }
        public Player Blue { get; set; }
        public Player? Green { get; set; }
        public Player? Yellow { get; set; }
    }
}
