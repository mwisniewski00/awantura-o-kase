using System.Collections.ObjectModel;
using Awantura.Domain.Entities;
using Awantura.Domain.Enums;

namespace Awantura.Domain.Models.Dtos
{
    public class GameInfoDto
    {
        public Guid Id { get; set; }
        public GameState GameState { get; set; }
        public int Round { get; set; }
        public Category? Category { get; set; }
        public string? Question { get; set; }
        public List<string>? Answers { get; set; }
        public required GameParticipants GameParticipants { get; set; }
        public int Pool { get; set; }
        public required List<PlayerGameScore> PlayerGameScores { get; set; }
        public required List<Bid> Bids { get; set; }
    }
}
