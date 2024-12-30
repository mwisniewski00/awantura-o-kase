using System.ComponentModel.DataAnnotations;

namespace Awantura.Domain.Models.Auth
{
    public class LoginRequestDto
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
