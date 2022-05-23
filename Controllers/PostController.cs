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
	public class PostController : ControllerBase
	{
		private readonly Database _context;
		private readonly AuthHandler _authHandler;

		public PostController(Database context)
		{
			_context = context;
			_authHandler = new AuthHandler(context);
		}

		// GET: api/Post
		[HttpGet]
		public async Task<ActionResult<IEnumerable<PostModel>>> GetPosts()
		{
			return await _context.Posts
			.Include(p => p.Po_Owner)
			.Include(p => p.Po_Likes)
			.OrderBy(p => p.Po_Date)
			.ToListAsync();
		}

		// GET: api/Post/5
		[HttpGet("{id}")]
		public async Task<ActionResult<PostModel>> GetPostModel(int id)
		{
			var postModel = await _context.Posts
			.Where(p => p.Po_Id == id)
			.Include(p => p.Po_Owner)
			.Include(p => p.Po_Likes)
			.FirstAsync();

			if (postModel == null)
			{
				return NotFound();
			}

			return postModel;
		}

		// PUT: api/Post/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
		public async Task<IActionResult> PutPostModel(int id, PostModel postModel)
		{
			if (id != postModel.Po_Id)
			{
				return BadRequest();
			}

			_context.Entry(postModel).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!PostModelExists(id))
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

		// POST: api/Post/like/postId/profileID
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost("like/{post}/{profile}")]
		public async Task<ActionResult<PostModel>> PostPostLikeModel(int post, int profile)
		{
			PostLikeModel plm = new PostLikeModel();
			plm.Po_Id = post;
			plm.Pr_Id = profile;
			_context.PostLikes.Add(plm);
			await _context.SaveChangesAsync();

			return Ok();
		}

		// DELETE: api/Post/unlike/postId/profileID
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpDelete("unlike/{post}/{profile}")]
		public async Task<ActionResult<PostModel>> DeletePostLikeModel(int post, int profile)
		{
			var plm = await _context.PostLikes.Where(pl => pl.Po_Id == post && pl.Pr_Id == profile)
			.FirstAsync();

			if (plm == null)
			{
				return NotFound();
			}
			_context.PostLikes.Remove(plm);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		// POST: api/Post
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost]
		public async Task<ActionResult<PostModel>> PostPostModel([FromForm] string postdata, [FromForm] string id)
		{
			if (!(await _authHandler.Authenticate(HttpContext))) return new EmptyResult();

			PostModel pm = JsonConvert.DeserializeObject<PostModel>(postdata);
			pm.Po_Date = DateTime.Now;
			pm.Po_Owner = await _context.Profiles.FindAsync(int.Parse(id));

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			_context.Posts.Add(pm);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetPostModel", new { id = pm.Po_Id }, pm);
		}

		// DELETE: api/Post/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeletePostModel(int id)
		{
			var postModel = await _context.Posts.FindAsync(id);
			if (postModel == null)
			{
				return NotFound();
			}

			_context.Posts.Remove(postModel);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		private bool PostModelExists(int id)
		{
			return _context.Posts.Any(e => e.Po_Id == id);
		}
	}
}
