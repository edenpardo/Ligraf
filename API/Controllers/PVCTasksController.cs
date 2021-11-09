using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.JobTasks.PVC;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class PVCTasksController: BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<PVCTask>>> GetPVCTasks()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PVCTask>> GetPVCTask(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id=id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePVCTask(PVCTask pvcTask)
        {
            return HandleResult(await Mediator.Send(new Create.Command {PVCTask=pvcTask}));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditPVCTask(Guid id,PVCTask pvcTask)
        {
            pvcTask.Id=id;
            return HandleResult(await Mediator.Send(new Edit.Command {PVCTask=pvcTask}));        
        }

    }
}