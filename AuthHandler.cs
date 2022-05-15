using AFI_Project.Data;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace AFI_Project
{
    public class AuthHandler
    {

        private Database _context;

        public AuthHandler(Database DbContext)
        {
            _context = DbContext;
        }

        public async Task<bool> Authenticate(HttpContext context)
        {

            string extractedKeyAndId = context.Request.Headers["ApiKey"];
            if(extractedKeyAndId is null)
            {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync("No API key provided");
                return false;
            }

            string[] tokenParts = extractedKeyAndId.ToString().Split('_');
            if(tokenParts.Length != 2)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Invalid API key provided");
                return false;
            }
            int id = int.Parse(tokenParts[0]);
            string extractedKey = tokenParts[1];

            var pm = await _context.Profiles.FindAsync(id);

            if(pm is null)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Invalid API key");
                return false;
            }

            if(pm.ApiKey != extractedKey)
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Invalid API key");
                return false;
            }
            
            return true;
        }

        public string Hash(string password, string salt)
		{
			return Convert.ToBase64String(KeyDerivation.Pbkdf2(
				password,
				Convert.FromBase64String(salt),
				KeyDerivationPrf.HMACSHA256,
				100000,
				256 / 8));
		}
		/// <summary>
		/// Generates a random salt.
		/// NOTE: Don't forget to set the profiles "Salt"-variabe before inserting into DB.
		/// </summary>
		/// <returns>The salt.</returns>
		public string GetRandomSalt()
		{
			byte[] salt = new byte[128 / 8];

			RNGCryptoServiceProvider rngCsp = new RNGCryptoServiceProvider();

			try
			{
				rngCsp.GetNonZeroBytes(salt);
			}
			finally
			{
				rngCsp.Dispose();
			}

			return Convert.ToBase64String(salt);
		}
    }
}