using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebChat.Models
{
    public class User:IdentityUser
    {
        DateTime lastVisit;
        string avatarPath;
       public  User() {
            lastVisit = new DateTime();
            avatarPath = "";
        }

        public DateTime Lastvisit { get => lastVisit; set => lastVisit = value; }
        public string AvatarPath { get => avatarPath; set => avatarPath = value; }
    }
}
