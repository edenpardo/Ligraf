using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.JobTasks.PVC
{
    public class Details
    {
       public class Query : IRequest<Result<PVCTask>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PVCTask>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PVCTask>> Handle(Query request, CancellationToken cancellationToken)
            {
                var pvcTask = await _context.PVCTasks
                .ProjectTo<PVCTask>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x=>x.Id==request.Id);

                return Result<PVCTask>.Success(pvcTask);
            }
        }
    }
}