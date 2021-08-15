using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Customers
{
    public class List
    {
        public class Query : IRequest<List<Customer>> { }

        public class Handler : IRequestHandler<Query, List<Customer>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Customer>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Customers.ToListAsync();
            }

        }
    }
}