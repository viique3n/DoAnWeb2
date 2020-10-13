
namespace WebApplication1.Features.Staff.Commands
{
    using MediatR;
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using WebApplication1.Infrastructure.Data;
    using WebApplication1.Infrastructure.Entities.Staff;

    public class CreateStaffCommandHandler : IRequestHandler<CreateStaffCommand, bool>
    {
        private readonly StaffContext _staffContext;
        public CreateStaffCommandHandler(StaffContext staffContext)
        {
            _staffContext = staffContext;
        }
        public async Task<bool> Handle(CreateStaffCommand request, CancellationToken cancellationToken)
        {
            var staff = new Staff(request.Name, request.PhoneNumber);
            try
            {
                await _staffContext.AddAsync(staff);
                await _staffContext.SaveChangesAsync();
                return true;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
