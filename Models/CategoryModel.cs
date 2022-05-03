using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace AFI_Project.Models
{
    [Table("Tbl_Categories")]
    public class CategoryModel
    {
        [Key]
        public int Cat_Id { get; set; }
        public string Cat_Name { get; set; } = String.Empty;
        public virtual ICollection<EventCategoryModel> Cat_Events { get; set; }
    }

}