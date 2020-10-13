using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApplication1.Infrastructure.Entities.Identity;

namespace WebApplication1.Infrastructure.Data.Configuration.Identity
{
    public class ApplicationUserEntityTypeConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            var passwordHasher = new PasswordHasher<ApplicationUser>();
            var user = new ApplicationUser
            {
                Id = "1",
                Email = "testuser@gmail.com",
                UserName = "testuser",
                NormalizedEmail = "testuser@gmail.com",
                EmailConfirmed = true,
                PhoneNumber = "0123456789",
                PhoneNumberConfirmed = true,
                TwoFactorEnabled = true
            };
            var hashedPassword = passwordHasher.HashPassword(user, "123456");
            user.PasswordHash = hashedPassword;
            builder.ToTable("AspNetUsers");
            builder.HasData(user);
        }
    }
}
