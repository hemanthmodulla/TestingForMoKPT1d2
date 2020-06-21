using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoKAPI_Test1.Models
{
    public class WidgetToList
    {
        public string UserID { get; set; }
        public string WidgetID { get; set; }
        public string name { get; set; }
        public string componentName { get; set; }
        public int cols { get; set; }
        public int rows { get; set; }
        public int y { get; set; }
        public int x { get; set; }
        public string model { get; set; }
    }
}
