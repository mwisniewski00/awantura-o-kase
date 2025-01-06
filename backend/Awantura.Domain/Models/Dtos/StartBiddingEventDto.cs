using Awantura.Domain.Entities;
using Awantura.Domain.Enums;

namespace Awantura.Domain.Models.Dtos
{
    public class StartBiddingEventDto
    {
        public int Pool { get; set; }
        public required List<PlayerGameScore> PlayerGameScores { get; set; }
        public required List<Bid> Bids { get; set; }
    }
}