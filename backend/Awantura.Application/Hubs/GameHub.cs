using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Awantura.Application.Hubs
{
    [Authorize]
    public sealed class GameHub : Hub
    {
        [Authorize(Roles = "Admin, Player")]
        public async Task NotifyBackend(Guid gameId)
        {
            // Example endpoint that can be use by front to notify backend

            // Do sth with request
            
            // Let know that request was served
            await Clients.Group(gameId.ToString()).SendAsync("SystemMessage", "Request served by backend");
        }

        [Authorize(Roles = "Admin, Player")]
        public async Task JoinGameGroup(string gameId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, gameId.ToLower());
            await Clients.Group(gameId).SendAsync("SystemMessage", $"{Context.ConnectionId} joined the game {gameId}");
        }
    }
}
