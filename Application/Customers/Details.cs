using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Customers
{
    public class Details
    {
        public class Query : IRequest<Customer>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Customer>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Customer> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Customers.FindAsync(request.Id);
            }
        }
    }
}