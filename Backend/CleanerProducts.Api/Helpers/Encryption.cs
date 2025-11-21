using System.Text;

namespace CleanerProducts.Api.Helpers
{
    public static class Encryption
    {
        public static void CreatePasswordHash(string password, out string passwordHash, out string passwordSalt)
        {
            byte[] saltBytes = new byte[16];
            System.Security.Cryptography.RandomNumberGenerator.Fill(saltBytes);
            passwordSalt = Convert.ToBase64String(saltBytes);

            using (var pbkdf2 = new System.Security.Cryptography.Rfc2898DeriveBytes(password, saltBytes, 100_000, System.Security.Cryptography.HashAlgorithmName.SHA512))
            {
                byte[] hashBytes = pbkdf2.GetBytes(64);
                passwordHash = Convert.ToBase64String(hashBytes);
            }
        }

        public static bool VerifyPassword(string password, string storedHash, string storedSalt)
        {
            byte[] saltBytes = Convert.FromBase64String(storedSalt);
            using (var pbkdf2 = new System.Security.Cryptography.Rfc2898DeriveBytes(password, saltBytes, 100_000, System.Security.Cryptography.HashAlgorithmName.SHA512))
            {
                byte[] hashBytes = pbkdf2.GetBytes(64);
                string computedHash = Convert.ToBase64String(hashBytes);
                return computedHash == storedHash;
            }
        }
    }
}
