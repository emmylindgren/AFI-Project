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
        [HttpGet("{disabilities?}")]
        public async Task<ActionResult<IEnumerable<EventModel>>> GetEvents([FromQuery] string disabilities)
        {
            if(disabilities is not null){
                // Make disabilities into a list of int
                var disabilitiesList = disabilities.Split(',').Select(int.Parse).ToList();
                return await _context.Events
                .Where(e => e.Ev_Disabilities.Any(d => disabilitiesList.Contains(d.Dis_Id)))
                .Include(e => e.Ev_Owner)
                .Include(e => e.Ev_AttendingModel)
                .ToListAsync();
            }
            else{
                return await _context.Events
                .Include(e => e.Ev_AttendingModel)
                .Include(e => e.Ev_Owner)
                .ToListAsync();
            }
        }

        // GET: api/Event/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<EventModel>> GetEventModel(int id)
        {
            var eventModel = await _context.Events
            .Where(e => e.Ev_Id == id)
            .Include(e => e.Ev_AttendingModel)
            .Include(e => e.Ev_RequestedInviteModel)
            .Include(e => e.Ev_Disabilities)
            .Include(e => e.Ev_Owner)
            .FirstOrDefaultAsync();

            if (eventModel == null)
            {
                return NotFound();
            }

            return eventModel;
        }

        // GET: api/Event/latest/5
        [HttpGet("latest/{personID}")]
        public async Task<ActionResult<EventModel>> GetLatestEvent(int personID)
        {
            var eventModel = await _context.Events.Where(e => e.Ev_Owner.Pr_Id == personID || e.Ev_AttendingModel.Any(a => a.Pr_Id == personID))
            .OrderBy(e => e.Ev_DateTime)
            .Include(e => e.Ev_Owner)
            .Include(e => e.Ev_AttendingModel)
            .FirstOrDefaultAsync();

            if (eventModel == null)
            {
                return NotFound();
            }

            return eventModel;
        }


        [HttpGet("image/{id}")]
		public async Task<IActionResult> GetEventPicture(int id)
		{
			var eventModel = await _context.Events.FindAsync(id);

			if (eventModel == null)
			{
				return NotFound();
			}

			// Using '+'-operator on paths is bad practice.
			var img = System.IO.File.OpenRead(System.IO.Directory.GetCurrentDirectory() + eventModel.Ev_Img);

			return File(img, "image/jpeg");
		}

        // GET: api/Event/profileID/1
        [HttpGet("profileID/{profileID}")]
        public async Task<ActionResult<IEnumerable<EventModel>>> GetAttendingEvent(int profileID)
        {
            return await _context.Events
            .Where(e => e.Ev_Owner.Pr_Id == profileID || e.Ev_AttendingModel.Any(a => a.Pr_Id == profileID))
            .OrderBy(e => e.Ev_DateTime)
            .ToListAsync();
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
