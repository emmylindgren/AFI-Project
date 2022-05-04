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
    public class EventController : ControllerBase
    {
        private readonly Database _context;

        public EventController(Database context)
        {
            _context = context;
        }

        // GET: api/Event
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventModel>>> GetEvents()
        {
            return await _context.Events.ToListAsync();
        }

        // GET: api/Event/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EventModel>> GetEventModel(int id)
        {
            var eventModel = await _context.Events.FindAsync(id);

            if (eventModel == null)
            {
                return NotFound();
            }

            return eventModel;
        }

        // PUT: api/Event/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEventModel(int id, EventModel eventModel)
        {
            if (id != eventModel.Ev_Id)
            {
                return BadRequest();
            }

            _context.Entry(eventModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventModelExists(id))
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

        // POST: api/Event
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EventModel>> PostEventModel(EventModel eventModel)
        {
            _context.Events.Add(eventModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEventModel", new { id = eventModel.Ev_Id }, eventModel);
        }

        // DELETE: api/Event/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEventModel(int id)
        {
            var eventModel = await _context.Events.FindAsync(id);
            if (eventModel == null)
            {
                return NotFound();
            }

            _context.Events.Remove(eventModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventModelExists(int id)
        {
            return _context.Events.Any(e => e.Ev_Id == id);
        }
    }
}
