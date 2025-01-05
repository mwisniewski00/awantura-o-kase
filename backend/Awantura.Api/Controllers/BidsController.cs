using AutoMapper;
using Awantura.Application.Interfaces;
using Awantura.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Awantura.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidsController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenRepository _tokenRepository;
        private readonly IBidRepository _bidRepository;
        private readonly IMapper _mapper;

        public BidsController(IUserRepository userRepository, IBidRepository bidRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _bidRepository = bidRepository;
            _mapper = mapper;
        }

        [HttpPost("MakeBid/{gameId}/{valueOffer}")]
        [Authorize(Roles = "Admin, Player")]
        public async Task<IActionResult> MakeBid(Guid gameId, int valueOffer)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Forbid();

            var playerId = new Guid(userId);

            var result = await _bidRepository.MakeBid(gameId, playerId, valueOffer);
            if (!result.Success)
                return BadRequest(result.Message);

            return Ok(result.Message);
        }

        [HttpPost("EndBidding/{gameId}")]
        [Authorize(Roles = "Admin, Player")]
        public async Task<IActionResult> EndBidding(Guid gameId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Forbid();
            }

            var result = await _bidRepository.EndBidding(gameId);
            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            return Ok(result.Message);
        }
    }
}
