using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace AFI_Project.Models
{
    [Table("Tbl_EventCategories")]
    public class EventCategoryModel
    {
        [Key]
        public int Cat_Id { get; set; }
        public string Cat_Name { get; set; } = String.Empty;
    }

}