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
    public class CommentController : ControllerBase
    {
        private readonly Database _context;

        public CommentController(Database context)
        {
            _context = context;
        }

        // GET: api/Comment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentModel>>> GetComments()
        {
            return await _context.Comments.ToListAsync();
        }

        // GET: api/Comment/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CommentModel>> GetCommentModel(int id)
        {
            var commentModel = await _context.Comments.FindAsync(id);

            if (commentModel == null)
            {
                return NotFound();
            }

            return commentModel;
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
        public async Task<ActionResult<CommentModel>> PostCommentModel(CommentModel commentModel)
        {
            _context.Comments.Add(commentModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCommentModel", new { id = commentModel.Co_Id }, commentModel);
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
