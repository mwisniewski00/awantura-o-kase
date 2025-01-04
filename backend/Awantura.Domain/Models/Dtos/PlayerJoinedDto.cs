namespace Awantura.Domain.Models.Dtos
{
    public class PlayerJoinedDto
    {
        public Guid Id { get; set; }
        public required string Username { get; set; }
        public required string PlayerColor { get; set; }
    }
}