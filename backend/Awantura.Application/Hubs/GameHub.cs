using Microsoft.AspNetCore.SignalR;

namespace Awantura.Application.Hubs
{
    public sealed class GameHub : Hub
    {
        public async Task NotifyBackend(Guid gameId)
        {
            // Example endpoint that can be use by front to notify backend

            // Do sth with request
            
            // Let know that request was served
            await Clients.Group(gameId.ToString()).SendAsync("SystemMessage", "Request served by backend");
        }

        public async Task JoinGameGroup(string gameId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, gameId.ToLower());
            await Clients.Group(gameId).SendAsync("SystemMessage", $"{Context.ConnectionId} joined the game {gameId}");
        }
    }
}
