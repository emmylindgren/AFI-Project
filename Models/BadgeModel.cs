using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace AFI_Project.Models
{
    [Table("Tbl_Badges")]
    public class BadgeModel
    {
        [Key]
        public int Ba_Id { get; set; }
        public string Ba_Name { get; set; } = String.Empty;
        public string Ba_Img { get; set; } = String.Empty;

        public virtual ICollection<ProfileBadgesModel> Ba_Profiles { get; set; }
    }
}