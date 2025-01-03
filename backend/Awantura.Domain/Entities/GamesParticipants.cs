﻿using System.Text.Json.Serialization;

namespace Awantura.Domain.Entities
{
    public class GameParticipants
    {
        [JsonIgnore]
        public Guid Id { get; set; }
        public Guid BluePlayerId { get; set; }
        public bool isBluePlayerReady { get; set; }
        public Guid? GreenPlayerId { get; set; }
        public bool isGreenPlayerReady { get; set; }
        public Guid? YellowPlayerId { get; set; }
        public bool isYellowPlayerReady { get; set; }

        [JsonIgnore]
        public Guid GameId { get; set; }
        [JsonIgnore]
        public Game Game { get; set; }
    }
}
