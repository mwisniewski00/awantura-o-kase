using AutoMapper;
using Awantura.Application.Interfaces;
using Awantura.Application.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace Awantura.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly UserManager<IdentityUser> _userManager;
        private readonly ITokenRepository _tokenRepository;
        private readonly IUserRepository _userRepository;

        private readonly CookieOptions _cookieOptions;

        public AuthController(UserManager<IdentityUser> userManager, ITokenRepository tokenRepository, IUserRepository userRepository)
        {
            _userManager = userManager;
            _tokenRepository = tokenRepository;
            _userRepository = userRepository;
            _cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                MaxAge = TimeSpan.FromDays(7),
                SameSite = SameSiteMode.Strict,
            };
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
            var refreshToken = await _tokenRepository.CreateRefreshToken(user);
            Response.Cookies.Append("jwt", refreshToken, _cookieOptions);
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

        [HttpGet("RefreshToken")]
        public async Task<IActionResult> RefreshToken()
        {
            if (Request.Cookies.TryGetValue("jwt", out string jwt))
            {
                var refreshToken = await _tokenRepository.GetRefreshTokenAsync(jwt);
                if (refreshToken == null)
                {
                    return Forbid();
                }
                var user = await _userRepository.GetUserById(refreshToken.UserId);

                var roles = await _userManager.GetRolesAsync(user);
                if (roles == null || roles.Count == 0)
                    return BadRequest("No roles found for given user");

                var token = _tokenRepository.CreateJWTToken(user, roles.ToArray());
                var newRefreshToken = await _tokenRepository.CreateRefreshToken(user);
                Response.Cookies.Append("jwt", newRefreshToken, _cookieOptions);
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

            return Forbid();
        }

        [HttpDelete("Logout")]
        public async Task<IActionResult> Logout()
        {
            if (Request.Cookies.TryGetValue("jwt", out string jwt))
            {
                var refreshToken = await _tokenRepository.GetRefreshTokenAsync(jwt);
                if (refreshToken == null)
                {
                    return Ok();
                }
                await _tokenRepository.RevokeToken(refreshToken.UserId);
                return Ok();
            }
            return Ok();
        }

        #region Private Methods

        private async Task<IActionResult> RegisterUserWithRole(RegisterRequestDto registerRequestDto, string role)
        {
            if (!IsValidEmail(registerRequestDto.Email))
                return BadRequest("Invalid email format.");

            if (string.IsNullOrEmpty(registerRequestDto.UserName) || registerRequestDto.UserName.Length < 3)
                return BadRequest("Username must be at least 3 characters long.");

            if (string.IsNullOrEmpty(registerRequestDto.Password) || registerRequestDto.Password.Length < 6)
                return BadRequest("Password must be at least 6 characters long.");

            var existingUser = await _userManager.FindByEmailAsync(registerRequestDto.Email);
            if (existingUser != null)
                return BadRequest("Email is already in use.");

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

        private bool IsValidEmail(string email)
        {
            var emailRegex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            return emailRegex.IsMatch(email);
        }

        #endregion
    }
}
