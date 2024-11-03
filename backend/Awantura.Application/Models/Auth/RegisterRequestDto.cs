using System.ComponentModel.DataAnnotations;

namespace Awantura.Application.Models.Auth
{
    public class RegisterRequestDto
    {
        [Required]
        public required string UserName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public required string Email { get; set; }

        [DataType(DataType.Password)]
        public required string Password { get; set; }

        [Required]
        public required string[] Roles { get; set; }
    }
}
