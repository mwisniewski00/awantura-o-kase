namespace Awantura.Domain.Entities
{
    public class Bid
    {
        public Guid GameId { get; set; }
        public Guid PlayerId { get; set; }
        public Guid QuestionId { get; set; }
        public int OfferValue { get; set; }
        public DateTime BidTime { get; set; }
    }
}