using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebChat.Hub
{
    public class ChatHub: Microsoft.AspNetCore.SignalR.Hub
    {
        public async Task Send(string message)
        {
            await this.Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
