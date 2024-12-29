using AutoMapper;
using Awantura.Application.Interfaces;
using Awantura.Application.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Awantura.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public readonly UserManager<IdentityUser> _userManager;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UsersController(UserManager<IdentityUser> userManager, IUserRepository userRepository, IMapper mapper)
        {
            _userManager = userManager;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "Admin, Player")]
        public async Task<IActionResult> GetUsers()
        {
            var usersDomain = await _userRepository.GetAllUsers();
            if (usersDomain == null)
                return NotFound();
            var usersWithRoles = new List<PlayerDto>();

            foreach (var user in usersDomain)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var userWithRoles = new PlayerDto
                {
                    Id = Guid.Parse(user.Id),
                    UserName = user.UserName!,
                    Email = user.Email!,
                    Roles = roles.ToList()
                };
                usersWithRoles.Add(userWithRoles);
            }

            return Ok(usersWithRoles);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin, Player")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var userDomain = await _userRepository.GetUserById(id);
            if (userDomain == null)
                return NotFound();

            var roles = await _userManager.GetRolesAsync(userDomain);
            var userWithRoles = new PlayerDto
            {
                Id = Guid.Parse(userDomain.Id),
                UserName = userDomain.UserName!,
                Email = userDomain.Email!,
                Roles = roles.ToList()
            };

            return Ok(userWithRoles);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin, Player")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UserUpdateDto updatedUser)
        {
            var UserDomain = _mapper.Map<PlayerDto>(updatedUser);
            var UserIdentityUser = await _userRepository.UpdateUser(id, UserDomain);
            if (UserIdentityUser == null)
                return NotFound();

            var UserDto = _mapper.Map<PlayerDto>(UserIdentityUser);
            return Ok(UserDto);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin, Player")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var User = await _userRepository.DeleteUser(id);
            if (User == null)
                return NotFound();
            return Ok(User);
        }
    }
}
