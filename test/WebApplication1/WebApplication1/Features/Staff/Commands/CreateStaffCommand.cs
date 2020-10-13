using MediatR;
using System.Runtime.Serialization;

namespace WebApplication1.Features.Staff.Commands
{
    [DataContract]
    public class CreateStaffCommand : IRequest<bool>
    {
        [DataMember]
        public string Id { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string PhoneNumber { get; set; }

        [DataMember]
        public string Street { get; set; }

        [DataMember]
        public string District { get; set; }

        [DataMember]
        public string City { get; set; }

        [DataMember]
        public string Country { get; set; }

        public CreateStaffCommand(string id, string name, string phoneNumber, string street = null, string district = null, string city = null, string country = null)
        {
            Id = id;
            Name = name;
            PhoneNumber = phoneNumber;
            Street = street;
            District = district;
            City = city;
            Country = country;
        }
    }
}
