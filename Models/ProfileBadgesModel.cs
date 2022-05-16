using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace AFI_Project.Models
{
    [Table("Tbl_ProfileBadges")]
    [Keyless]
    public class ProfileBadgesModel
    {
        public BadgeModel Pr_Ba_Badge{ get; set; }
        public ProfileModel Pr_Ba_Profile { get; set; }

        public int Ba_Id { get; set; }
        public int Pr_Id { get; set; }
    }
}