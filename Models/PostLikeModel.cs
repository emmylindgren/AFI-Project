using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace AFI_Project.Models
{
    [Table("Tbl_PostLikes")]
    [Keyless]
    public class PostLikeModel
    {
        public PostModel? PoLi_Post{ get; set; }

        public ProfileModel? PoLi_Profile {get;set;}

        public int Po_Id {get;set;}

        public int Pr_Id {get;set;}

    }

}