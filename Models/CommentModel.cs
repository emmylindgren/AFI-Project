using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace AFI_Project.Models
{
    [Table("Tbl_Comments")]
    public class CommentModel
    {
        [Key]
        public int Co_Id {get;set;}

        public string Co_Content { get; set; } = String.Empty;

        public ProfileModel Co_Owner {get;set;}

        public DateTime Co_Date{get;set;}

        public virtual ICollection<CommentLikeModel>? Co_Likes{ get; set; }

        public PostModel Co_Post {get;set;}

    }
}