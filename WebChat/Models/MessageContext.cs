using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebChat.Models
{
    public class MessageContext:DbContext
    {
        public DbSet<TextMessage> TextMessages { get; set; }
        public MessageContext(DbContextOptions<MessageContext> options)
            : base(options)
        {
             Database.EnsureCreated();  
        }
    }
}
