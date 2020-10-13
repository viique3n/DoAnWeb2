using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Features.Staff.Models
{
    public class StaffModel
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string PhoneNumber { get; set; }
    }
}
