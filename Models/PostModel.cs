using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace AFI_Project.Models
{
    [Table("Tbl_Posts")]
    public class PostModel
    {
        [Key]
        public int Po_Id {get;set;}

        public string Po_Content { get; set; } = String.Empty;

        public DateTime Po_Date{get;set;}

        public ProfileModel Po_Owner {get;set;}

        public virtual ICollection<PostLikeModel>? Po_Likes{ get; set; }

        public virtual ICollection<CommentModel>? Po_Comments{ get; set; }

    }
}