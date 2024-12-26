using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Awantura.Domain.Entities
{
    public class Player
    {
        Guid Id { get; set; }
        public string UserName { get; set; }
    }
}