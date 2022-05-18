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
            if (disabilities is not null)
            {
                // Make disabilities into a list of int
                var disabilitiesList = disabilities.Split(',').Select(int.Parse).ToList();
                return await _context.Events
                .Where(e => e.Ev_Disabilities.Any(d => disabilitiesList.Contains(d.Dis_Id)))
                .Include(e => e.Ev_Owner)
                .Include(e => e.Ev_AttendingModel)
                .Include(e => e.Ev_Disabilities)
                .ToListAsync();
            }
            else
            {
                return await _context.Events
                .Include(e => e.Ev_AttendingModel)
                .Include(e => e.Ev_Owner)
                .Include(e => e.Ev_Disabilities)
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
            .Include(e => e.Ev_DeclinedInviteModel)
            .Include(e => e.Ev_InterestedModel)
            .Include(e => e.Ev_Disabilities)
            .Include(e => e.Ev_Categories)
            .Include(e => e.Ev_Owner)
            .FirstOrDefaultAsync();

            if (eventModel == null)
            {
                return NotFound();
            }

            return eventModel;
        }

        // GET: api/Event/requests/5
        [HttpGet("requests/{id:int}")]
        public async Task<ActionResult<IEnumerable<int>>> GetRequestsForEvent(int id)
        {
            var requests = await _context.RequestedInvites
            .Where(r => r.Ev_Id == id)
            .Select(r => r.Pr_Id)
            .ToListAsync();

            if (requests == null)
            {
                return NotFound();
            }

            return requests;
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
		public async Task<ActionResult<EventModel>> PostEventModel([FromForm] IFormFile uploadFile, [FromForm] string eventdata, [FromForm] string id)
		{
            EventModel em = JsonConvert.DeserializeObject<EventModel>(eventdata);
            em.Ev_Owner = await _context.Profiles.FindAsync(int.Parse(id));
			await RecieveFile(uploadFile, em);

			 _context.Events.Add(em);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEventModel", new { id = em.Ev_Id }, em);
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

        
        // POST: api/Event/addGoing/{eventid}/person/{personid}
        [HttpPost("addGoing/{eventid}/person/{personid}")]
		public async Task<ActionResult> AddGoing(int eventid, int personid)
		{
            AttendingModel am = new AttendingModel();
            am.Ev_Id = eventid;
            am.Pr_Id = personid;
            am.At_Event = await _context.Events.FindAsync(eventid);
            am.At_Profile = await _context.Profiles.FindAsync(personid);

            _context.Attendees.Add(am);
            await _context.SaveChangesAsync();

            return Ok();
		}

         // POST: api/Event/addInterested/{eventid}/person/{personid}
        [HttpPost("addInterested/{eventid}/person/{personid}")]
		public async Task<ActionResult> AddInterested(int eventid, int personid)
		{
            InterestedModel im = new InterestedModel();
            im.Ev_Id = eventid;
            im.Pr_Id = personid;
            im.In_Event = await _context.Events.FindAsync(eventid);
            im.In_Profile = await _context.Profiles.FindAsync(personid);

            _context.Interested.Add(im);
            await _context.SaveChangesAsync();

            return Ok();
		}

         // POST: api/Event/addRequest/{eventid}/person/{personid}
        [HttpPost("addRequest/{eventid}/person/{personid}")]
		public async Task<ActionResult> AddRequestInvite(int eventid, int personid)
		{
            RequestedInviteModel rim = new RequestedInviteModel();
            rim.Ev_Id = eventid;
            rim.Pr_Id = personid;
            rim.Req_Event = await _context.Events.FindAsync(eventid);
            rim.Req_Profile = await _context.Profiles.FindAsync(personid);

            _context.RequestedInvites.Add(rim);
            await _context.SaveChangesAsync();

            return Ok();
		}

        // POST: api/Event/acceptRequest/{eventid}/person/{personid}
        [HttpPost("acceptRequest/{eventid}/person/{personid}")]
		public async Task<ActionResult> AcceptRequestInvite(int eventid, int personid)
		{
            var rim = await _context.RequestedInvites
            .Where(r => r.Ev_Id == eventid && r.Pr_Id == personid)
            .FirstAsync();

            if (rim == null)
            {
                return NotFound();
            }

            _context.RequestedInvites.Remove(rim);
            await _context.SaveChangesAsync();

            AttendingModel am = new AttendingModel();
            am.Pr_Id = personid;
            am.Ev_Id = eventid;
            am.At_Event = await _context.Events.FindAsync(eventid);
            am.At_Profile = await _context.Profiles.FindAsync(personid);

			 _context.Attendees.Add(am);
            await _context.SaveChangesAsync();

            return Ok();
		}

        // DELETE: api/Event/deleteAttending/{eventid}/person/{personid}
        [HttpDelete("deleteAttending/{eventid}/person/{personid}")]
        public async Task<IActionResult> DeleteAttendingModel (int eventid, int personid)
        {
            var am = await _context.Attendees
            .Where(i => i.Ev_Id == eventid && i.Pr_Id == personid)
            .FirstAsync();

            if (am == null)
            {
                return NotFound();
            }

            _context.Attendees.Remove(am);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // DELETE: api/Event/deleteInterested/{eventid}/person/{personid}
        [HttpDelete("deleteInterested/{eventid}/person/{personid}")]
        public async Task<IActionResult> DeleteInterestedModel (int eventid, int personid)
        {
            var im = await _context.Interested
            .Where(i => i.Ev_Id == eventid && i.Pr_Id == personid)
            .FirstAsync();

            if (im == null)
            {
                return NotFound();
            }

            _context.Interested.Remove(im);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Event/declineRequest/{eventid}/person/{personid}
        [HttpDelete("declineRequest/{eventid}/person/{personid}")]
        public async Task<IActionResult> DeleteRequestModel(int eventid, int personid)
        {
            var rim = await _context.RequestedInvites
            .Where(r => r.Ev_Id == eventid && r.Pr_Id == personid)
            .FirstAsync();

            if (rim == null)
            {
                return NotFound();
            }

            _context.RequestedInvites.Remove(rim);
            await _context.SaveChangesAsync();

            DeclinedInviteModel dim = new DeclinedInviteModel();
            dim.Pr_Id = personid;
            dim.Ev_Id = eventid;
            dim.Dec_Event = await _context.Events.FindAsync(eventid);
            dim.Dec_Profile = await _context.Profiles.FindAsync(personid);

            _context.DeclinedInvites.Add(dim);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        		/// <summary>
		/// Saves the provided IFormFile into the directory
		/// wwwroot/uploadedfiles and sets this file as
		/// the profile picture of the provided ProfileModel.
		/// </summary>
		/// <param name="uploadFile"></param>
		private async Task RecieveFile(IFormFile uploadFile, EventModel em)
		{
			if (uploadFile != null && uploadFile.Length > 0)
			{
				// Get the type of file (png, jpeg, webp, etc...)
				string fileExtension = System.IO.Path.GetExtension(
					uploadFile.FileName);

				// The purpose of count.txt is to keep track of how many
				// images have been uploaded and to make sure no duplicate
				// file names exist. New files are namned to the next index.

				int index;
				try
				{
					// Try to read the first line of file count.txt.
					index = int.Parse(System.IO.File.ReadLines(
					"Pictures/count.txt")
					.First());
				}
				// If the file does not exist, start index from 0.
				catch (FileNotFoundException)
				{
					index = 0;
				}

				index++;

				// Write index to count.txt. If count.txt does not
				// exist, WriteAllText creates a file and writes to it.
				System.IO.File.WriteAllText(
					"Pictures/count.txt",
					index.ToString());

				// Set the name of the incoming file to index.
				string fileName = index.ToString() + fileExtension;
				string filePath = Path.Combine("Pictures/", fileName);

				em.Ev_Img = "/Pictures/" + fileName;

				using (var fileStream = new FileStream(filePath, FileMode.Create))
				{
					await uploadFile.CopyToAsync(fileStream);
				}
			}
		}
    }
}
