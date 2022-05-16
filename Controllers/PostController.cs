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

namespace AFI_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly Database _context;

        public PostController(Database context)
        {
            _context = context;
        }

        // GET: api/Post
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostModel>>> GetPosts()
        {
            return await _context.Posts.ToListAsync();
        }

        // GET: api/Post/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PostModel>> GetPostModel(int id)
        {
            var postModel = await _context.Posts.FindAsync(id);

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

        // POST: api/Post
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PostModel>> PostPostModel(PostModel postModel)
        {
            _context.Posts.Add(postModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPostModel", new { id = postModel.Po_Id }, postModel);
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
