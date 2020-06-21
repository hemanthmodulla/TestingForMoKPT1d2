using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoKAPI_Test1.Models;

namespace MoKAPI_Test1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WidgetController : ControllerBase
    {
        private readonly WidgetContext _context;

        public WidgetController(WidgetContext context)
        {
            _context = context;
        }

        // GET: api/Widget
        [HttpGet]
        public ActionResult Get()
        {
            var query = from wt in _context.WidgetTable
                        select new {
                            id = wt.WidgetID,
                            name = wt.name,
                            componentName = wt.componentName,
                            componentType = wt.componentType,
                            cols = wt.cols,
                            rows = wt.rows,
                            wt.y,
                            wt.x,
                            wt.model
                        };

            
            return Ok(query.ToList());
        }

        // GET: api/Widget/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Widget
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Widget/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
