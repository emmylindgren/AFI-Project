using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace AFI_Project.Models
{
    [Table("Tbl_EventDisabilities")]
    [Keyless]
    public class EventDisabilityModel
    {
        public EventModel Ev_Dis_Event { get; set; }

        public DisabilityModel Ev_Dis_Disability { get; set; }
        public int Ev_Id { get; set; }

        public int Dis_Id { get; set; }
    }
}