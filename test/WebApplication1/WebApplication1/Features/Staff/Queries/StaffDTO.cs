using System;

namespace WebApplication1.Features.Staff.Queries
{
    public class StaffDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public StaffDTO()
        {

        }
        public StaffDTO(string id, string name, string phoneNumber)
        {
            Id = id;
            Name = name;
            PhoneNumber = phoneNumber;
        }
    }
}
