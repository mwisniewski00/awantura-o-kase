namespace Awantura.Domain.Entities
{
    public class Bid
    {
        public Guid GameId { get; set; }
        public Guid PlayerId { get; set; }
        public int Amount { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}