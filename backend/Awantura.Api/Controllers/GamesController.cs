using System.Security.Claims;
using AutoMapper;
using Awantura.Application.Interfaces;
using Awantura.Domain.Models.Auth;
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
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Forbid();
            }
            var user = await _userRepository.GetUserById(userId);
            var userDto = _mapper.Map<PlayerDto>(user);

            var gameGuid = await _gameRepository.CreateNewGame(userDto.Id);
            return Ok(gameGuid);
        }

        [HttpPost("JoinGame/{gameId}")]
        [Authorize(Roles = "Admin, Player")]
        public async Task<IActionResult> JoinGame(Guid gameId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Forbid();
            }

            var user = await _userRepository.GetUserById(userId);
            var userDto = _mapper.Map<PlayerDto>(user);

            var result = await _gameRepository.AddPlayerToGame(gameId, userDto.Id);
            if (!result.Success)
                return BadRequest(result.Message);

            return Ok(result.Message);
        }

        [HttpPost("StartGame/{gameId}")]
        [Authorize(Roles = "Admin, Player")]
        public async Task<IActionResult> StartGame(Guid gameId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Forbid();
            }

            var result = await _gameRepository.StartGame(gameId);
            if (!result.Success)
                return BadRequest(result.Message);

            return Ok(result.Message);
        }

        [HttpGet("GetGame/{gameId}")]
        [Authorize(Roles = "Admin, Player")]
        public async Task<IActionResult> GetGame(Guid gameId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Forbid();
            }

            var game = await _gameRepository.GetGame(gameId, userId);
            if (game == null)
            {
                return NotFound();
            }

            return Ok(game);
        }

        [HttpPut("PlayerReady/{gameId}")]
        [Authorize(Roles = "Admin, Player")]
        public async Task<IActionResult> SetPlayerReady(Guid gameId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Forbid();
            }

            var user = await _userRepository.GetUserById(userId);
            var userDto = _mapper.Map<PlayerDto>(user);

            var isReady = await _gameRepository.SetPlayerReady(gameId, userDto.Id);
            if (isReady == false)
                return BadRequest(isReady);
            else
                return Ok(isReady);

        }
    }
}
