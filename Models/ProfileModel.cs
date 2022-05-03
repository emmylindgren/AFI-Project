using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace AFI_Project.Models
{
    [Table("Tbl_Profiles")]
    public class ProfileModel
    {
        [Key]
        public int Pr_Id { get; set; }
        public string Pr_Firstname { get; set; } = String.Empty;
        public string Pr_Lastname { get; set; } = String.Empty;
        [Column(TypeName="Date")]
        public DateTime Pr_BirthDate { get; set; }
        public string Pr_Street { get; set; } = String.Empty;
        public string Pr_PostalCode { get; set; } = String.Empty;
        public string Pr_City { get; set; } = String.Empty;
        public string Pr_Img { get; set; } = String.Empty;
    }

}