using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebChat.Hub
{
    public class ChatHub: Microsoft.AspNetCore.SignalR.Hub
    {
        public async Task Send(string message, string minutes,string hours)
        {
            await this.Clients.Others.SendAsync("ReceiveMessage", message,minutes,hours);
        }
    }
}
