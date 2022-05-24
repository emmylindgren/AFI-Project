#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AFI_Project.Data;
using AFI_Project.Models;
using Newtonsoft.Json;

namespace AFI_Project.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CommentController : ControllerBase
	{
		private readonly Database _context;

		public CommentController(Database context)
		{
			_context = context;
		}

		// GET: api/Comment/fromPost/5 to get all comments corresponding to post with id 5. 
		[HttpGet("fromPost/{id}")]
		//Task<ActionResult<IEnumerable<PostModel>>>
		public async Task<ActionResult<ICollection<CommentModel>>> GetComments(int id)
		{
			//if (!(await _authHandler.Authenticate(HttpContext))) return new EmptyResult();

			return await _context.Comments.Where(p => p.Co_Post.Po_Id == id)
			.Include(c => c.Co_Owner).Include(c => c.Co_Likes)
			.OrderByDescending(c => c.Co_Date)
			.ToListAsync();
		}

		// POST: api/Comment/like/commentId/profileID
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost("like/{comment}/{profile}")]
		public async Task<ActionResult<PostModel>> PostPostLikeModel(int comment, int profile)
		{
			CommentLikeModel clm = new CommentLikeModel();
			clm.Co_Id = comment;
			clm.Pr_Id = profile;
			_context.CommentLikes.Add(clm);
			await _context.SaveChangesAsync();

			return Ok();
		}

		// Delete: api/Comment/unlike/commentId/profileID
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpDelete("unlike/{comment}/{profile}")]
		public async Task<ActionResult<PostModel>> DeleteCommentLikeModel(int comment, int profile)
		{
			var clm = await _context.CommentLikes.Where(cl => cl.Co_Id == comment && cl.Pr_Id == profile)
			.FirstAsync();

			if (clm == null)
			{
				return NotFound();
			}
			_context.CommentLikes.Remove(clm);
			await _context.SaveChangesAsync();

			return NoContent();
		}


		// PUT: api/Comment/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
		public async Task<IActionResult> PutCommentModel(int id, CommentModel commentModel)
		{
			if (id != commentModel.Co_Id)
			{
				return BadRequest();
			}

			_context.Entry(commentModel).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!CommentModelExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return NoContent();
		}

		// POST: api/Comment
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost]
		public async Task<ActionResult<CommentModel>> PostCommentModel([FromForm] string commentdata, [FromForm] int id, [FromForm] int postId)
		{
			CommentModel cm = JsonConvert.DeserializeObject<CommentModel>(commentdata);
			cm.Co_Date = DateTime.Now;
			cm.Co_Owner = await _context.Profiles.FindAsync(id);
			cm.Co_Post = await _context.Posts.FindAsync(postId);
			_context.Comments.Add(cm);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetCommentModel", new { id = cm.Co_Id }, cm);
		}

		// DELETE: api/Comment/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteCommentModel(int id)
		{
			var commentModel = await _context.Comments.FindAsync(id);
			if (commentModel == null)
			{
				return NotFound();
			}

			_context.Comments.Remove(commentModel);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		private bool CommentModelExists(int id)
		{
			return _context.Comments.Any(e => e.Co_Id == id);
		}
	}
}
