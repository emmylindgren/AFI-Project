using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace AFI_Project.Models
{
    [Table("Tbl_ProfileDisabilities")]
    [Keyless]
    public class ProfileDisabilityModel
    {
        public DisabilityModel Pr_Dis_Disability{ get; set; }

        public ProfileModel Pr_Dis_Profile { get; set; }
        public int Dis_Id { get; set; }

        public int Pr_Id { get; set; }
    }
}