namespace Awantura.Domain.Models.Dtos
{
    public class BidDoneEventDto
    {
        public int NewPool { get; set; }
        public Guid PlayerId { get; set; }
        public int NewAccountBalance { get; set; }
        public DateTime Timestamp { get; set; }
        public int Amount { get; set; }
    }
}