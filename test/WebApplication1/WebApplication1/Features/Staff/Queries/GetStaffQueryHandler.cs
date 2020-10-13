using MediatR;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using WebApplication1.Infrastructure.Data;
using WebApplication1.Infrastructure.Entities.Staff;

namespace WebApplication1.Features.Staff.Queries
{
    public class GetStaffQueryHandler : IRequestHandler<GetStaffQuery, StaffDTO>
    {
        private readonly StaffContext _staffContext;
        public GetStaffQueryHandler(StaffContext staffContext)
        {
            _staffContext = staffContext;
        }
        public async Task<StaffDTO> Handle(GetStaffQuery request, CancellationToken cancellationToken)
        {
            if (request.Id != null)
            {
                var result = await _staffContext.Staffs.Where(s => s.Id.ToString() == request.Id).FirstOrDefaultAsync();
                var staff = new StaffDTO(result.Id.ToString(), result.Name, result.PhoneNumber);
                return staff;
            }
            else
            {
                return null;
            }
        }
    }
}
