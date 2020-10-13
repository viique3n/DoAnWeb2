using Microsoft.EntityFrameworkCore;
using WebApplication1.Infrastructure.Data.Configuration.Staff;
using WebApplication1.Infrastructure.Entities.Staff;

namespace WebApplication1.Infrastructure.Data
{
    public class StaffContext : DbContext
    {
        public DbSet<Staff> Staffs { get; set; }
        public StaffContext(DbContextOptions<StaffContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new StaffEntityTypeConfiguration());
            base.OnModelCreating(builder);
        }
    }
}
