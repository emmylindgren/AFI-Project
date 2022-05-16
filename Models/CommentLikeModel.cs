using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace AFI_Project.Models
{
    [Table("Tbl_CommentLikes")]
    [Keyless]
    public class CommentLikeModel
    {
        public CommentModel? CoLi_Comment{ get; set; }

        public ProfileModel? CoLi_Profile {get;set;}

        public int Co_Id {get;set;}

        public int Pr_Id {get;set;}

    }

}