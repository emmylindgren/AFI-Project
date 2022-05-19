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
using System.Net;
using Newtonsoft.Json;

namespace AFI_Project.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ProfileController : ControllerBase
	{
		private readonly Database _context;
		private readonly AuthHandler _authHandler;

		public ProfileController(Database context)
		{
			_context = context;
			_authHandler = new AuthHandler(context);
		}

		// GET: api/Profile
		[HttpGet]
		public async Task<ActionResult<IEnumerable<ProfileModel>>> GetProfiles()
		{
			if (!(await _authHandler.Authenticate(HttpContext))) return new EmptyResult();

			return await _context.Profiles.ToListAsync();
		}

		// GET: api/Profile/attendeesEventId=3
		[HttpGet("attendeesEventId/{attendeesEventId}")]
		public async Task<ActionResult<IEnumerable<int>>> GetProfiles(int attendeesEventId)
		{
			if (!(await _authHandler.Authenticate(HttpContext))) return new EmptyResult();

			var list = await _context.Attendees.Where(a => a.Ev_Id == attendeesEventId).Select(a => a.Pr_Id).ToListAsync();
			return list;
		}

		[HttpGet("image/{id}")]
		public async Task<IActionResult> GetProfilePicture(int id)
		{
			//if (!(await _authHandler.Authenticate(HttpContext))) return new EmptyResult();

			var profileModel = await _context.Profiles.FindAsync(id);

			if (profileModel == null)
			{
				return NotFound();
			}

			// Using '+'-operator on paths is bad practice.
			var img = System.IO.File.OpenRead(System.IO.Directory.GetCurrentDirectory() + profileModel.Pr_Img);

			return File(img, "image/jpeg");
		}

		// GET: api/Profile/5
		[HttpGet("{id}")]
		public async Task<ActionResult<ProfileModel>> GetProfileModel(int id)
		{
			if (!(await _authHandler.Authenticate(HttpContext))) return new EmptyResult();

			var profileModel = await _context.Profiles.FindAsync(id);

			if (profileModel == null)
			{
				return NotFound();
			}

			return profileModel;
		}

		//GET: api/Profile/shortdetails/5
		[HttpGet("shortdetails/{id}")]
		public async Task<ActionResult<Object>> GetShortInfoProfileModel(int id)
		{
			if (!(await _authHandler.Authenticate(HttpContext))) return new EmptyResult();
			var profileModel = await _context.Profiles
			.Where(p => p.Pr_Id ==id)
			.Select(p => new {p.Pr_Firstname, p.Pr_Lastname, p.Pr_City, p.Pr_Street})
			.FirstAsync();

			if (profileModel == null)
			{
				return NotFound();
			}
		
			return profileModel;
		}

		// GET: api/Profile/googleID/string
		[HttpGet("googleID/{googleID}")]
		public async Task<ActionResult<string>> GetWithGId(string googleID)
		{
			var list = await _context.Profiles.Where(p => p.GoogleId == googleID).ToListAsync();

			if (list.Count == 0)
			{
				return NotFound();
			}

			return list[0].Pr_Id + "_" + list[0].ApiKey;
		}

		// PUT: api/Profile/5
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPut("{id}")]
		public async Task<IActionResult> PutProfileModel(int id, ProfileModel profileModel)
		{
			if (!(await _authHandler.Authenticate(HttpContext))) return new EmptyResult();

			if (id != profileModel.Pr_Id)
			{
				return BadRequest();
			}

			_context.Entry(profileModel).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!ProfileModelExists(id))
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

		// GET: api/profile/badges/5 to get all badges corresponding to person with id 5. 
        [HttpGet("badges/{id}")]
        public async Task<ActionResult<IEnumerable<ProfileBadgesModel>>> GetProfileBadges(int id)
        {
			if (!(await _authHandler.Authenticate(HttpContext))) return new EmptyResult();
			
            return await _context.ProfileBadges
            .Where(b => b.Pr_Id == id)
			.Include(b=> b.Pr_Ba_Badge.Ba_Name)
            .ToListAsync();
        }

		// POST: api/Profile
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost]
		public async Task<ActionResult<ProfileModel>> PostProfileModel([FromForm] IFormFile uploadFile, [FromForm] string userdata)
		{
			ProfileModel pm = JsonConvert.DeserializeObject<ProfileModel>(userdata);
			await RecieveFile(uploadFile, pm);

			pm.Pr_GoogleIdSalt = _authHandler.GetRandomSalt();
			pm.ApiKey = _authHandler.Hash(pm.GoogleId, pm.Pr_GoogleIdSalt);

			_context.Profiles.Add(pm);
			await _context.SaveChangesAsync();

			return CreatedAtAction("GetProfileModel", new { id = pm.Pr_Id }, pm);
		}

		// DELETE: api/Profile/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteProfileModel(int id)
		{
			if (!(await _authHandler.Authenticate(HttpContext))) return new EmptyResult();

			var profileModel = await _context.Profiles.FindAsync(id);
			if (profileModel == null)
			{
				return NotFound();
			}

			_context.Profiles.Remove(profileModel);
			await _context.SaveChangesAsync();

			return NoContent();
		}

		// GET: api/Profile/disabilities/5
        [HttpGet("disabilities/{id}")]
        public async Task<ActionResult<IEnumerable<int>>> GetProfileDisabilities(int id)
        {
            if (!(await _authHandler.Authenticate(HttpContext))) return new EmptyResult();

            var disabilitiesList = await _context.Disabilities.
            Where(d => d.Di_Profiles.Any(p => p.Pr_Id == id))
            .Select(d => d.Di_Id)
            .ToListAsync();

            if (disabilitiesList == null)
            {
                return NotFound();
            }

            return disabilitiesList;
        }

		private bool ProfileModelExists(int id)
		{
			return _context.Profiles.Any(e => e.Pr_Id == id);
		}

		/// <summary>
		/// Saves the provided IFormFile into the directory
		/// wwwroot/uploadedfiles and sets this file as
		/// the profile picture of the provided ProfileModel.
		/// </summary>
		/// <param name="uploadFile"></param>
		private async Task RecieveFile(IFormFile uploadFile, ProfileModel pm)
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

				pm.Pr_Img = "/Pictures/" + fileName;

				using (var fileStream = new FileStream(filePath, FileMode.Create))
				{
					await uploadFile.CopyToAsync(fileStream);
				}
			}
		}
	}
}
