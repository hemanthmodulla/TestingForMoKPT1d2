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
        public ActionResult Get(string id)
        {
            var query = (from wt in _context.WidgetTable
                         where wt.UserID == id
                        select new WidgetToList
                        {
                            id = wt.WidgetID,
                            name = wt.name,
                            componentName = wt.componentName,
                            componentType = "",
                            rows = wt.rows,
                            cols = wt.cols,
                            x = wt.x,
                            y = wt.y,
                            model = wt.model
                        });


            return Ok(query.ToList());
        }

        // GET: api/Widget/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/Widget
        [HttpPost]
        public void Post([FromBody] List<WidgetToList> value)
        {

            var widgetTableItems = from v in value
                                   select new WidgetTable
                                   {
                                       UserID = "123",
                                       WidgetID = v.id,
                                       name = v.name,
                                       componentName = v.componentName,
                                       rows = v.rows,
                                       cols = v.cols,
                                       x = v.x,
                                       y = v.y,
                                       model = v.model

                                   };
            string uID = widgetTableItems.First().UserID;
            _context.WidgetTable.RemoveRange(_context.WidgetTable.Where(x => x.UserID == uID));
            _context.SaveChanges();

            _context.WidgetTable.AddRange(widgetTableItems);
            _context.SaveChanges();

            //public ActionResult Post([FromBody] RegisterClass userInformation)
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
