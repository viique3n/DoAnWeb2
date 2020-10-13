using System;

namespace WebApplication1.Infrastructure.Entities.Staff
{
    public class Staff
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public Staff()
        {

        }
        public Staff(string name, string phoneNumber)
        {
            Name = name;
            PhoneNumber = phoneNumber;
        }
    }
}
