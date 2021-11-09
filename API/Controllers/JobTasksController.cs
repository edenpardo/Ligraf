using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.JobTasks.JobTasks;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{  
    [AllowAnonymous]
    public class JobTasksController: BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<JobTask>>> GetTasks()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
    }
}