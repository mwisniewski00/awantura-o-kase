namespace Awantura.Domain.Models.Auth
{
    public class LoginResponseDto
    {
        public string Id { get; set; }
        public string JwtToken { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public List<String> Roles { get; set; }
    }
}
