using Microsoft.AspNetCore.Identity;

namespace Awantura.Application.Interfaces
{
    public interface ITokenRepository
    {
        string CreateJWTToken(IdentityUser user, string[] roles);
    }
}