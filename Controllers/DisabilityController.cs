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
    public class DisabilityController : ControllerBase
    {
        private readonly Database _context;

        public DisabilityController(Database context)
        {
            _context = context;
        }

        // GET: api/Disability
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DisabilityModel>>> GetDisabilities()
        {
            return await _context.Disabilities.ToListAsync();
        }

        // GET: api/Disability/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DisabilityModel>> GetDisabilityModel(int id)
        {
            var disabilityModel = await _context.Disabilities.FindAsync(id);

            if (disabilityModel == null)
            {
                return NotFound();
            }

            return disabilityModel;
        }

        // PUT: api/Disability/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDisabilityModel(int id, DisabilityModel disabilityModel)
        {
            if (id != disabilityModel.Di_Id)
            {
                return BadRequest();
            }

            _context.Entry(disabilityModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DisabilityModelExists(id))
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

        // POST: api/Disability
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DisabilityModel>> PostDisabilityModel(DisabilityModel disabilityModel)
        {
            _context.Disabilities.Add(disabilityModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDisabilityModel", new { id = disabilityModel.Di_Id }, disabilityModel);
        }

        // DELETE: api/Disability/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDisabilityModel(int id)
        {
            var disabilityModel = await _context.Disabilities.FindAsync(id);
            if (disabilityModel == null)
            {
                return NotFound();
            }

            _context.Disabilities.Remove(disabilityModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DisabilityModelExists(int id)
        {
            return _context.Disabilities.Any(e => e.Di_Id == id);
        }
    }
}
