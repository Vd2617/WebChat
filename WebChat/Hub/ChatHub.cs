using Microsoft.AspNetCore.SignalR;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebChat.Models;
namespace WebChat.Hub
{
    public class ChatHub: Microsoft.AspNetCore.SignalR.Hub
    {
        MessageContext _context;
        public ChatHub(MessageContext context) {
            this._context = context;
            
            
        }
        public async Task Send(string message,string time)
        {
         
            await this.Clients.Others.SendAsync("ReceiveMessage",message,time);

           
        }
    }
}
