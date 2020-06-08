using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebChat.Models
{
    public class PictureMessage:Message
    {
        string messagePath;

        public string MessagePath { get => messagePath; set => messagePath = value; }
    }
}
