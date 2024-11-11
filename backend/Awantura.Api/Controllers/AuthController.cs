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
    public class AuthController : ControllerBase
    {
        public readonly UserManager<IdentityUser> _userManager;
        private readonly ITokenRepository _tokenRepository;
        private readonly IMapper _mapper;

        public AuthController(UserManager<IdentityUser> userManager, ITokenRepository tokenRepository)
        {
            _userManager = userManager;
            _tokenRepository = tokenRepository;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerRequestDto)
        {
            return await RegisterUserWithRole(registerRequestDto, "Player");
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("RegisterAdmin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterRequestDto registerRequestDto)
        {
            return await RegisterUserWithRole(registerRequestDto, "Admin");
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequestDto)
        {
            var user = await _userManager.FindByEmailAsync(loginRequestDto.Email);
            if (user == null)
                return BadRequest("Email is incorrect or User is not registered.");

            var passwordIsValid = await _userManager.CheckPasswordAsync(user, loginRequestDto.Password);
            if (!passwordIsValid)
                return BadRequest("Password is incorrect");

            var roles = await _userManager.GetRolesAsync(user);
            if (roles == null || roles.Count == 0)
                return BadRequest("No roles found");

            var token = _tokenRepository.CreateJWTToken(user, roles.ToArray());
            var response = new LoginResponseDto
            {
                Id = user.Id,
                JwtToken = token,
                UserName = user.UserName,
                Email = user.Email,
                Roles = roles.ToList()
            };

            return Ok(response);
        }

        #region Private Methods

        private async Task<IActionResult> RegisterUserWithRole(RegisterRequestDto registerRequestDto, string role)
        {
            var user = new IdentityUser
            {
                UserName = registerRequestDto.UserName,
                Email = registerRequestDto.Email
            };

            var identityResult = await _userManager.CreateAsync(user, registerRequestDto.Password);
            if (!identityResult.Succeeded)
                return BadRequest(identityResult.Errors);

            identityResult = await _userManager.AddToRolesAsync(user, [role]);
            if (!identityResult.Succeeded)
                return BadRequest(identityResult.Errors);

            return Ok(user);
        }

        #endregion
    }
}
