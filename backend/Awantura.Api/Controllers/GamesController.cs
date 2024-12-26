using AutoMapper;
using Awantura.Application.Interfaces;
using Awantura.Application.Models.Auth;
using Awantura.Infrastructure.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Awantura.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenRepository _tokenRepository;
        private readonly IGameRepository _gameRepository;
        private readonly IMapper _mapper;

        public GamesController(IUserRepository userRepository, IGameRepository gameRepository, ITokenRepository tokenRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _gameRepository = gameRepository;
            _tokenRepository = tokenRepository;
            _mapper = mapper;
        }

        [HttpPost("CreateGame")]
        [Authorize(Roles = "Admin, Player")]
        public async Task<IActionResult> CreateNewGame()
        {
            if (Request.Cookies.TryGetValue("jwt", out string jwt))
            {
                var refreshToken = await _tokenRepository.GetRefreshTokenAsync(jwt);
                if (refreshToken == null)
                {
                    return Forbid();
                }
                var user = await _userRepository.GetUserById(refreshToken.UserId);
                var userDto = _mapper.Map<UserDto>(user);

                var gameGuid = _gameRepository.CreateNewGame(userDto.Id);
                return Ok(gameGuid);
            }

            return Forbid();
        }
    }
}
