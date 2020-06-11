using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WebChat.Models
{
    public class ApplicationContext: IdentityDbContext<User>
    {
        public DbSet<TextMessage> TextMessages { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
          : base(options)
        {
            Database.EnsureCreated();
        }

        public ApplicationContext()
        {
        }
    }
}
