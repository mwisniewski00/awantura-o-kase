using Awantura.Domain.Enums;

namespace Awantura.Domain.Models.Dtos
{
    public class RoundStartedDto
    {
        public int RoundNumber { get; set; }
        public Category? Category { get; set; }
    }
}