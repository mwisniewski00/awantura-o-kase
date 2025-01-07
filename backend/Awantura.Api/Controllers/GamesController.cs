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
        private readonly IGameRepository _gameRepository;
        private readonly IMapper _mapper;

        public GamesController(IUserRepository userRepository, IGameRepository gameRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _gameRepository = gameRepository;
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

            var result = await _gameRepository.AddPlayerToGame(gameId, userDto);
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

            var gameInfo = await _gameRepository.GetGame(gameId, userId);
            if (gameInfo == null)
            {
                return NotFound();
            }

            return Ok(gameInfo);
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

        [HttpPost("QuestionAnswer/{gameId}")]
        [Authorize(Roles = "Admin, Player")]
        public async Task<IActionResult> AnswerQuestion([FromRoute] Guid gameId, [FromBody] int answerIndex)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Forbid();
            }

            var user = await _userRepository.GetUserById(userId);
            var userDto = _mapper.Map<PlayerDto>(user);

            var result = await _gameRepository.AnswerQuestion(gameId, userDto.Id, answerIndex);
            if (result.Success)
                return Ok(result.Message);
            return BadRequest(result.Message);
        }
    }
}
