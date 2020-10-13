using MediatR;

namespace WebApplication1.Features.Staff.Queries
{
    public class GetStaffQuery : IRequest<StaffDTO>
    {
        public string Id { get; set; }
        public GetStaffQuery()
        {

        }
        public GetStaffQuery(string id = null)
        {
            Id = id;
        }
    }
}
