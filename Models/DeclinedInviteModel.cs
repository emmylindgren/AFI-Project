using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace AFI_Project.Models
{
    [Table("Tbl_DeclinedInvites")]
    [Keyless]
    public class DeclinedInviteModel
    {
        public EventModel Dec_Event { get; set; }
        public ProfileModel Dec_Profile { get; set; }

        public int Ev_Id { get; set; }

        public int Pr_Id { get; set; }
    }

}