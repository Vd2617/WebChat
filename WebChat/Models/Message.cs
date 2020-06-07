using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebChat.Models
{
    public class Message
    {
        string text;
        string id;
        DateTime date;

        public Message() {
           
            date = new DateTime();

            date = DateTime.Now;

        }
       
        public string Id { get => id; set => id = value; }
        public DateTime Date { get => date; set => date = value; }
        public string Text { get => text; set => text = value; }
    }
}
