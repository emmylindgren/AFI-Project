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

        [ForeignKey("Ev_Category")]
        public IEnumerable<EventCategoryModel> Ev_Categories { get; set; }

        [ForeignKey("Ev_SuitableFor")]
        public IEnumerable<DisabilityModel> Ev_SuitableFor { get; set; }

        [ForeignKey("Ev_Attending")]
        public IEnumerable<ProfileModel> Ev_Attending { get; set; }

        [ForeignKey("Ev_Interested")]
        public IEnumerable<ProfileModel> Ev_Interested { get; set; }
        
        [ForeignKey("Ev_RequestedInvite")]
        public IEnumerable<ProfileModel> Ev_RequestedInvite { get; set; }

        [ForeignKey("Ev_DeclinedInvite")]
        public IEnumerable<ProfileModel> Ev_DeclinedInvite { get; set; }
        
        [ForeignKey("Ev_Owner")]
        public ProfileModel Ev_Owner { get; set; }
    }

}