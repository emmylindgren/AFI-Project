using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace AFI_Project.Models
{
    [Table("Tbl_Interested")]
    [Keyless]
    public class InterestedModel
    {
        public EventModel In_Event { get; set; }
        public ProfileModel In_Profile { get; set; }
        public int Ev_Id { get; set; }
        public int Pr_Id { get; set; }
    }

}