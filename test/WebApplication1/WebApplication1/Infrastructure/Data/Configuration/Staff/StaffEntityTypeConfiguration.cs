
namespace WebApplication1.Infrastructure.Data.Configuration.Staff
{
    using System;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using WebApplication1.Infrastructure.Entities.Staff;

    public class StaffEntityTypeConfiguration : IEntityTypeConfiguration<Staff>
    {
        public void Configure(EntityTypeBuilder<Staff> builder)
        {
            builder.ToTable("Staffs");
            builder.HasKey(s => s.Id);
            builder.HasData(
                new Staff
                {
                    Id = new Guid("bc94fdf6-4f9f-40ae-9e0e-ffb3e7a9751a"),
                    Name = "Tran Quoc Duy",
                    PhoneNumber = "01124154654"
                },
                new Staff
                {
                    Id = new Guid("e22e4a05-ef94-463b-888b-52a37dd1f0fc"),
                    Name = "Nguyen Thi Lan Nhi",
                    PhoneNumber = "02132132132"
                },
                new Staff
                {
                    Id = new Guid("503c48d2-97f8-402c-acd8-172e5aa0334d"),
                    Name = "Tran Tien Anh",
                    PhoneNumber = "0012313212132"
                },
                new Staff
                {
                    Id = new Guid("62fe4d45-1d34-4653-9c5b-27f739d34f0b"),
                    Name = "Nguyen The Hung",
                    PhoneNumber = "321321232132"
                },
                new Staff
                {
                    Id = new Guid("462f88a0-b58b-456c-a0d9-d1f6d2fbb687"),
                    Name = "Tran TranTran",
                    PhoneNumber = "0111111111"
                });
        }
    }
}
