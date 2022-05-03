using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace AFI_Project.Models
{
    [Table("Tbl_RequestedInvites")]
    [Keyless]
    public class RequestedInviteModel
    {
        public EventModel Req_Event { get; set; }
        public int Ev_Id { get; set; }
        public ProfileModel Req_Profile { get; set; }
        public int Pr_Id { get; set; }
    }

}