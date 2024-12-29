using Awantura.Application.Interfaces;
using Awantura.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Awantura.Infrastructure.Services.Auth
{
    public class TokenRepository : ITokenRepository
    {
        private readonly IConfiguration _conf;
        private readonly AwanturaAuthDbContext _context;

        public TokenRepository(IConfiguration conf, AwanturaAuthDbContext context)
        {
            _conf = conf;
            _context = context;
        }

        private JwtSecurityToken generateToken(List<Claim> claims, DateTime expires)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_conf["JWT:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            return new JwtSecurityToken(_conf["JWT:Issuer"], _conf["JWT:Audiance"], claims, expires: expires, signingCredentials: credentials);
        }

        public string CreateJWTToken(IdentityUser user, string[] roles)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };
            foreach (var role in roles)
                claims.Add(new Claim(ClaimTypes.Role, role));

            var token = generateToken(claims, DateTime.Now.AddMinutes(15));

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<string> CreateRefreshToken(IdentityUser user)
        {
            var expiryDate = DateTime.Now.AddDays(7);
            var token = generateToken(new List<Claim>(), expiryDate);
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            await SaveRefreshTokenAsync(user.Id, tokenString, expiryDate);
            return tokenString;
        }

        private async Task SaveRefreshTokenAsync(string userId, string token, DateTime expiryDate)
        {
            var refreshToken = new RefreshToken
            {
                Token = token,
                UserId = userId,
                ExpiryDate = expiryDate,
                IsRevoked = false
            };

            _context.RefreshTokens.Add(refreshToken);
            await _context.SaveChangesAsync();
        }

        public async Task<RefreshToken> GetRefreshTokenAsync(string token)
        {
            return await _context.RefreshTokens.Where(refreshToken => refreshToken.Token == token).FirstOrDefaultAsync();
        }

        public async Task RevokeToken(string userId)
        {
            var refreshTokens = _context.RefreshTokens
                .Where(refreshToken => refreshToken.UserId == userId);
            _context.RefreshTokens.RemoveRange(refreshTokens);
            await _context.SaveChangesAsync();
        }
    }
}
