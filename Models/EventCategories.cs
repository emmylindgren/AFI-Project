using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace AFI_Project.Models
{
    [Table("Tbl_EventCategories")]
    [Keyless]
    public class EventCategoryModel
    {
        public EventModel Ev_Cat_Event { get; set; }

        public CategoryModel Ev_Cat_Category { get; set; }
        public int Ev_Id { get; set; }

        public int Cat_Id { get; set; }
    }
}