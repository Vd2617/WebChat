using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;
using WebChat.Models;
namespace WebChat.Hub
{
    public class ChatHub: Microsoft.AspNetCore.SignalR.Hub
    {
        readonly IServiceProvider _service;
        public ChatHub(IServiceProvider service):base() {

            _service = service;
        }
        public async Task Send(string message,string time)
        {
            await this.Clients.Others.SendAsync("ReceiveMessage", message, time);
            ApplicationContext applicationContext = _service.GetService<ApplicationContext>();
            if (message.Length != 0 && time.Length != 0)
                await SaveMessage(message, time, applicationContext);
        }
        private async Task SaveMessage(string message ,string time,ApplicationContext applicationContext) {

            TextMessage textMessage = new TextMessage
            {
                Text = message,
                MessageTime = time,
                Author = "Anonimous"
            };
            applicationContext.TextMessages.Add(textMessage);
            await applicationContext.SaveChangesAsync();
        }
    }
}
