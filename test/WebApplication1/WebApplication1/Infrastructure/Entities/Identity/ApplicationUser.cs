using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace WebApplication1.Infrastructure.Entities.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public List<RefreshToken> RefreshTokens{ get; set; }
    }
}
