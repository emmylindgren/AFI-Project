using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace AFI_Project.Models
{
    [Table("Tbl_Events")]
    public class EventModel
    {
        [Key]
        public int Ev_Id { get; set; }
        public string Ev_Title { get; set; } = String.Empty;
        public bool Ev_Private { get; set; }
        public string Ev_Img { get; set; } = String.Empty;
        public string Ev_Street { get; set; } = String.Empty;
        public string Ev_PostalCode { get; set; } = String.Empty;
        public string Ev_City { get; set; } = String.Empty;
        public string Ev_Description { get; set; } = String.Empty;
        [Column(TypeName="Date")]
        public DateTime Ev_DateTime { get; set; }
        public virtual ICollection<RequestedInviteModel> Ev_RequestedInviteModel { get; set; }
        public virtual ICollection<DeclinedInviteModel> Ev_DeclinedInviteModel { get; set; }
        public virtual ICollection<InterestedModel> Ev_InterestedModel { get; set; }
        public virtual ICollection<AttendingModel> Ev_AttendingModel { get; set; }
        public ProfileModel Ev_Owner { get; set; }
    }

}