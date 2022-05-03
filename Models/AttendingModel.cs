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
    }

}