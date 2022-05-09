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

        public ProfileController(Database context)
        {
            _context = context;
        }

        // GET: api/Profile
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProfileModel>>> GetProfiles()
        {
            return await _context.Profiles.ToListAsync();
        }

        // GET: api/Profile/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProfileModel>> GetProfileModel(int id)
        {
            var profileModel = await _context.Profiles.FindAsync(id);

            if (profileModel == null)
            {
                return NotFound();
            }

            return profileModel;
        }

        // GET: api/Profile/googleID=string
        [HttpGet("googleID/{googleID}")]
        public async Task<ActionResult<int>> GetWithGId(string googleID)
        {

            var list = await _context.Profiles.Where(p => p.GoogleId == googleID).ToListAsync();

            if (list.Count == 0)
            {
                return NotFound();
            }

            return list[0].Pr_Id;
        }

        // PUT: api/Profile/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProfileModel(int id, ProfileModel profileModel)
        {
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

        // POST: api/Profile
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProfileModel>> PostProfileModel([FromForm] IFormFile uploadFile,[FromForm] string userdata)
        {
            ProfileModel profileModel = JsonConvert.DeserializeObject<ProfileModel>(userdata);
            await RecieveFile(uploadFile, profileModel);

            _context.Profiles.Add(profileModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProfileModel", new { id = profileModel.Pr_Id }, profileModel);
        }

        // DELETE: api/Profile/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProfileModel(int id)
        {
            var profileModel = await _context.Profiles.FindAsync(id);
            if (profileModel == null)
            {
                return NotFound();
            }

            _context.Profiles.Remove(profileModel);
            await _context.SaveChangesAsync();

            return NoContent();
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
		private async Task RecieveFile(IFormFile uploadFile,ProfileModel pm)
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
					"Profilepictures/count.txt")
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
					"Profilepictures/count.txt",
					index.ToString());

				// Set the name of the incoming file to index.
				string fileName = index.ToString() + fileExtension;
				string filePath = Path.Combine("Profilepictures/", fileName);

				pm.Pr_Img = "/Profilepictures/" + fileName;

				using (var fileSrteam = new FileStream(filePath, FileMode.Create))
				{
					await uploadFile.CopyToAsync(fileSrteam);
				}
			}
		}
    }
}
