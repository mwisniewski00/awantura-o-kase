namespace Awantura.Application.Models.Auth
{
    public class UserUpdateDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; }
    }
}
