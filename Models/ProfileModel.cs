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
        public string GoogleId { get; set; } = String.Empty;
        public string Pr_GoogleIdSalt { get; set; } = String.Empty;
        // Is Hash(GoogleId, Pr_GoogleIdSalt)
        public string ApiKey { get; set; } = String.Empty;

        public virtual ICollection<RequestedInviteModel>? Pr_RequestedInviteModel { get; set; }
        public virtual ICollection<DeclinedInviteModel>? Pr_DeclinedInviteModel { get; set; }
        public virtual ICollection<InterestedModel>? Pr_InterestedModel { get; set; }
        public virtual ICollection<AttendingModel>? Pr_AttendingModel { get; set; }
        public virtual ICollection<ProfileDisabilityModel>? Pr_Disabilities { get; set; }
    }

}