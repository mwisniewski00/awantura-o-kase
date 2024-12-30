namespace Awantura.Domain.Models.SignalREvents
{
    public class PlayerJoinedDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string PlayerColor { get; set; }
    }
}