using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace AFI_Project.Models
{
    [Table("Tbl_Attendees")]
    [Keyless]
    public class AttendingModel
    {
        public EventModel At_Event { get; set; }

        public ProfileModel At_Profile { get; set; }
        public int Ev_Id { get; set; }

        public int Pr_Id { get; set; }
    }
}