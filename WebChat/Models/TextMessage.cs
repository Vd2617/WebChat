using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebChat.Models
{
    public class TextMessage:Message
    {
        string text;
        public TextMessage(string time):base(time) { }//string time format 00:00
        public string Text { get => text; set => text = value; }
    }
}
