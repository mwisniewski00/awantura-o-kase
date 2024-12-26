using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Awantura.Application.Interfaces
{
    public interface IGameRepository
    {
        Task<Guid> CreateNewGame(Guid playerId);
    }
}
