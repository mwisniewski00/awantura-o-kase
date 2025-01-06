using System.Text.Json.Serialization;

namespace Awantura.Domain.Entities
{
    public class Bid
    {
        [JsonIgnore]
        public Guid GameId { get; set; }
        public Guid PlayerId { get; set; }
        public int Amount { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}