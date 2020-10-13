using System.Collections.Generic;
using System.Threading.Tasks;
using WebApplication1.Features.Identity.Models;
using WebApplication1.Infrastructure.Entities.Identity;

namespace WebApplication1.Features.Identity
{
    public interface IUserService
    {
        Task<AuthenticateResponse> AuthenticateAsync(AuthenticateRequest model, string ipAddress);

        Task<AuthenticateResponse> RefreshTokenAsync(string token, string ipAddress);

        Task<bool> RevokeTokenAsync(string token, string ipAddress);

        IEnumerable<ApplicationUser> GetAll();

        Task<ApplicationUser> GetByIdAsync(int id);
    }
}
