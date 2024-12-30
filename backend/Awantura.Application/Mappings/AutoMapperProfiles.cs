using AutoMapper;
using Awantura.Domain.Models.Auth;
using Microsoft.AspNetCore.Identity;

namespace Awantura.Application.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<PlayerDto, IdentityUser>().ReverseMap();
        }
    }
}
