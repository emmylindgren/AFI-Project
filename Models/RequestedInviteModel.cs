using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace AFI_Project.Models
{
    [Table("Tbl_RequestedInvites")]
    [Keyless]
    public class RequestedInviteModel
    {
        public EventModel Req_Event { get; set; }
        public ProfileModel Req_Profile { get; set; }
    }

}