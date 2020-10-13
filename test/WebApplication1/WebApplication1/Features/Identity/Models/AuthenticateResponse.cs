using System.Text.Json.Serialization;
using WebApplication1.Infrastructure.Entities.Identity;

namespace WebApplication1.Features.Identity.Models
{
    public class AuthenticateResponse
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string JwtToken { get; set; }

        [JsonIgnore]
        public string RefreshToken { get; set; }

        public AuthenticateResponse(ApplicationUser user, string jwtToken, string refreshToken)
        {
            Id = user.Id;
            Name = user.UserName;
            JwtToken = jwtToken;
            RefreshToken = refreshToken;
        }
    }
}
