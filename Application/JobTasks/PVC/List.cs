using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
namespace Application.JobTasks.PVC
{
    public class List
    {
        public class Query : IRequest<Result<List<PVCTask>>> { }

        public class Handler : IRequestHandler<Query, Result<List<PVCTask>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<PVCTask>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var pvcasks = await _context.PVCTasks
                .ProjectTo<PVCTask>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

                return Result<List<PVCTask>>.Success(pvcasks);
            }

        }
    }
}