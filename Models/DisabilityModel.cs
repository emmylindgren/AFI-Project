using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace AFI_Project.Models
{
    [Table("Tbl_Disabilities")]
    public class DisabilityModel
    {
        [Key]
        public int Di_Id { get; set; }
        public string Di_Name { get; set; } = String.Empty;
    }

}