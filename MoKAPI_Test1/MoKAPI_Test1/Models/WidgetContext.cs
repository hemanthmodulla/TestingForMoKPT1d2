
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoKAPI_Test1.Models
{
    public class WidgetContext :DbContext
    {

        public WidgetContext(DbContextOptions<WidgetContext> options) : base(options)
        { }

        public DbSet<WidgetTable> WidgetTable { get; set; }


    }
}
