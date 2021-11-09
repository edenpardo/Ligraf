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


namespace Application.JobTasks.JobTasks
{
    public class List
    {
        public class Query : IRequest<Result<List<JobTask>>> { }

        public class Handler : IRequestHandler<Query, Result<List<JobTask>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<JobTask>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var jobTasks = await _context.JobTasks
                .ProjectTo<JobTask>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

                return Result<List<JobTask>>.Success(jobTasks);
            }

        }
    }
}