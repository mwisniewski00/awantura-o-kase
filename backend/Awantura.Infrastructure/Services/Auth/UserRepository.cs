using Awantura.Application.Interfaces;
using Awantura.Application.Models.Auth;
using Awantura.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Awantura.Infrastructure.Services.Auth
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _configuration;
        private readonly AwanturaAuthDbContext _dbContext;
        private readonly UserManager<IdentityUser> _userManager;

        public UserRepository(IConfiguration conf, AwanturaAuthDbContext context, UserManager<IdentityUser> userManager)
        {
            _configuration = conf;
            _dbContext = context;
            _userManager = userManager;
        }

        public async Task<List<IdentityUser>> GetAllUsers()
        {
            return await _dbContext.Users.ToListAsync();
        }

        public async Task<IdentityUser> GetUserById(string id)
        {
            return await _dbContext.Users.Where(e => e.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IdentityUser> UpdateUser(string id, PlayerDto updatedUser)
        {
            var existingUser = await _dbContext.Users
               .FirstOrDefaultAsync(x => x.Id == id);
            if (existingUser == null)
                return null;

            existingUser.UserName = updatedUser.UserName;
            existingUser.Email = updatedUser.Email;

            var roles = await _userManager.GetRolesAsync(existingUser);
            await _userManager.RemoveFromRolesAsync(existingUser, roles);
            await _userManager.AddToRolesAsync(existingUser, updatedUser.Roles);

            await _dbContext.SaveChangesAsync();
            return existingUser;
        }

        public async Task<IdentityUser> DeleteUser(string id)
        {
            var User = await _dbContext.Users
                .FirstOrDefaultAsync(x => x.Id == id);
            if (User == null)
                return null;

            _dbContext.Users.Remove(User);
            await _dbContext.SaveChangesAsync();
            return User;
        }
    }
}
