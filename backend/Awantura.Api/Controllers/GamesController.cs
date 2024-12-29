using AutoMapper;
using Awantura.Application.Interfaces;
using Awantura.Application.Models.Auth;
using Microsoft.AspNetCore.Authorization;
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
                    return Forbid();

                var user = await _userRepository.GetUserById(refreshToken.UserId);
                var userDto = _mapper.Map<PlayerDto>(user);

                var gameGuid = await _gameRepository.CreateNewGame(userDto.Id);
                return Ok(gameGuid);
            }

            return Forbid();
        }

        [HttpPost("JoinGame/{gameId}")]
        [Authorize(Roles = "Admin, Player")]
        public async Task<IActionResult> JoinGame(Guid gameId)
        {
            if (Request.Cookies.TryGetValue("jwt", out string jwt))
            {
                var refreshToken = await _tokenRepository.GetRefreshTokenAsync(jwt);
                if (refreshToken == null)
                    return Forbid();

                var user = await _userRepository.GetUserById(refreshToken.UserId);
                var userDto = _mapper.Map<PlayerDto>(user);

                var result = await _gameRepository.AddPlayerToGame(gameId, userDto.Id);
                if (!result.Success)
                    return BadRequest(result.Message);

                return Ok(result.Message);
            }

            return Forbid();
        }

        [HttpPost("StartGame/{gameId}")]
        [Authorize(Roles = "Admin, Player")]
        public async Task<IActionResult> StartGame(Guid gameId)
        {
            if (Request.Cookies.TryGetValue("jwt", out string jwt))
            {
                var refreshToken = await _tokenRepository.GetRefreshTokenAsync(jwt);
                if (refreshToken == null)
                    return Forbid();


                var result = await _gameRepository.StartGame(gameId);
                if (!result.Success)
                    return BadRequest(result.Message);

                return Ok(result.Message);
            }

            return Forbid();
        }
    }
}
