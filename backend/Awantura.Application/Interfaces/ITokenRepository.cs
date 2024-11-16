using Microsoft.AspNetCore.Identity;

namespace Awantura.Application.Interfaces
{
    public interface ITokenRepository
    {
        string CreateJWTToken(IdentityUser user, string[] roles);
        Task<string> CreateRefreshToken(IdentityUser user);
        Task<RefreshToken> GetRefreshTokenAsync(string token);
        Task RevokeToken(string token);
    }
}