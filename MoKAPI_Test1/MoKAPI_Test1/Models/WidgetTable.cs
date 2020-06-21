using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MoKAPI_Test1.Models
{
    public class WidgetTable
    {
        [Key]
        public Guid WidgetTableID { get; set; }
        public int UserID { get; set; }
        [Required]
        public string WidgetID { get; set; }

        [Required]
        public string name { get; set; }

        [Required]
        public string componentName { get; set; }

        [Required]
        public int cols { get; set; }

        [Required]
        public int rows { get; set; }

        [Required]
        public int y { get; set; }

        [Required]
        public int x { get; set; }
        public string model { get; set; }
    }
}
