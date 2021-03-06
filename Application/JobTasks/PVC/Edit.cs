using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.JobTasks.PVC
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public PVCTask PVCTask { get; set; }
        }
        
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var pvcTask = await _context.PVCTasks.FindAsync(request.PVCTask.Id);
                if (pvcTask==null) return null;

                _mapper.Map(request.PVCTask,pvcTask);
                var result=await _context.SaveChangesAsync()>0;
                if (!result) return Result<Unit>.Failure("Failed to edit pvcTask");
                return  Result<Unit>.Success(Unit.Value);
            }
        }

    }
}