using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebChat.Models
{
    public class Message
    {
      
            string author;
             
            int  id;
            
            string messageTime;
           
            string year;
           
            string month;

        public Message(string time) {//time format 00:00

          

             DateTime messagedate = DateTime.Now;

            this.year = messagedate.Year.ToString();

            this.month = messagedate.Month.ToString();

            this.messageTime = time;
        }
        public Message() {
           

            DateTime messagedate = DateTime.Now;

            this.year = messagedate.Year.ToString();

            this.month = messagedate.Month.ToString();
        }
          
            public int Id { get => id; set => id = value; }
            public string MessageTime { get => messageTime; set => messageTime = value; }
            public string Author { get => author; set => author = value; }
            public string Year { get => year; set => year = value; }
            public string Month { get => month; set => month = value; }
    }
   
}
