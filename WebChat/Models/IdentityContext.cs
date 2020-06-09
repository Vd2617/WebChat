using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebChat.Models
{
    public class IdentityContext: IdentityDbContext<User>
    {
        public DbSet<TextMessage> TextMessages { get; set; }
        public IdentityContext(DbContextOptions<IdentityContext> options)
          : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
