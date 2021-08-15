using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Customers
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Customer Customer { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var customer = await _context.Customers.FindAsync(request.Customer.Id);
                _mapper.Map(request.Customer,customer);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}