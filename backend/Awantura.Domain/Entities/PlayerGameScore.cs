using System.Text.Json.Serialization;

namespace Awantura.Domain.Entities
{
    public class PlayerGameScore
    {
        [JsonIgnore]
        public Guid GameId { get; set; }
        public Guid PlayerId { get; set; }
        public int Points { get; set; }
        public int Balance { get; set; }
        [JsonIgnore]
        public Game Game { get; set; }
    }
}