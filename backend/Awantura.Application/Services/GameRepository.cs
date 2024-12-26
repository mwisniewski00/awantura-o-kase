using Awantura.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Awantura.Application.Services
{
    public class GameRepository : IGameRepository
    {
        public Task<Guid> CreateNewGame(Guid playerId)
        {
            throw new NotImplementedException();
        }
    }
}
