using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using WebChat.Models;
namespace WebChat.Hub
{
    public class ChatHub: Microsoft.AspNetCore.SignalR.Hub
    {
      
        public ChatHub() {

          
        }
        public async Task Send(string message,string time)
        {
         

            await this.Clients.Others.SendAsync("ReceiveMessage",message,time);

           
        }
    }
}
