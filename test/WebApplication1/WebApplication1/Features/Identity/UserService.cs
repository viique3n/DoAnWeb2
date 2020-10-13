using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using WebApplication1.Features.Identity.Models;
using WebApplication1.Infrastructure.Data;
using WebApplication1.Infrastructure.Entities.Identity;

namespace WebApplication1.Features.Identity
{
    public class UserService : IUserService
    {
        private readonly IdentityContext _context;
        private readonly AppSettings _appSettings;
        private readonly UserManager<ApplicationUser> _userManager;
        public UserService(IdentityContext context, IOptions<AppSettings> appSettings, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _appSettings = appSettings.Value;
            _userManager = userManager;
        }


        public async Task<AuthenticateResponse> AuthenticateAsync(AuthenticateRequest model, string ipAddress)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return null;
            }
            if (await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var jwtToken = generateJwtToken(user);
                var refreshToken = generateRefreshToken(ipAddress);

                // Save refresh token
                user.RefreshTokens.Add(refreshToken);
                _context.Update(user);
                await _context.SaveChangesAsync();

                return new AuthenticateResponse(user, jwtToken, refreshToken.Token); ;
            }
            return null;
        }

        public async Task<AuthenticateResponse> RefreshTokenAsync(string token, string ipAddress)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == token));

            // Return null if no user found with token
            if (user == null)
            {
                return null;
            }

            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);

            // Return null if token is no longer active
            if (!refreshToken.IsActive)
            {
                return null;
            }

            // Replace old refresh token with a new one and save
            var newRefreshToken = generateRefreshToken(ipAddress);
            refreshToken.Revoked = DateTime.UtcNow;
            refreshToken.RevokedByIp = ipAddress;
            refreshToken.ReplacedByToken = newRefreshToken.Token;
            user.RefreshTokens.Add(newRefreshToken);
            _context.Update(user);
            await _context.SaveChangesAsync();

            // Generate new Jwt
            var jwtToken = generateJwtToken(user);

            return new AuthenticateResponse(user, jwtToken, newRefreshToken.Token);
        }

        public async Task<bool> RevokeTokenAsync(string token, string ipAddress)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == token));

            // Return false if no user found with token
            if (user == null)
            {
                return false;
            }

            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);

            // Return false if token is not active
            if (!refreshToken.IsActive)
            {
                return false;
            }

            // Revoke token and save
            refreshToken.Revoked = DateTime.UtcNow;
            refreshToken.RevokedByIp = ipAddress;
            _context.Update(user);
            await _context.SaveChangesAsync();

            return true;
        }

        public IEnumerable<ApplicationUser> GetAll()
            => _context.Users;

        public async Task<ApplicationUser> GetByIdAsync(int id)
            => await _context.Users.FindAsync(id);

        #region Helper methods

        private string generateJwtToken(ApplicationUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(15),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private RefreshToken generateRefreshToken(string ipAddress)
        {
            using (var rngCryptoServiceProvider = new RNGCryptoServiceProvider())
            {
                var randomBytes = new byte[64];
                rngCryptoServiceProvider.GetBytes(randomBytes);
                return new RefreshToken
                {
                    Token = Convert.ToBase64String(randomBytes),
                    Expires = DateTime.UtcNow.AddDays(7),
                    Created = DateTime.UtcNow,
                    CreatedByIp = ipAddress
                };
            }
        }
    }
}
