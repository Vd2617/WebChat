using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WebChat.Hub;
using WebChat.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;

namespace WebChat
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public Startup(IConfiguration configuration)

        {

            Configuration = configuration;


        }
            public IConfiguration Configuration { get; }
    

        public void ConfigureServices(IServiceCollection services)
        {
           
           
            services.AddControllersWithViews();
            services.AddRazorPages();
            services.AddSignalR();

            services.AddDbContext<ApplicationContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddIdentity<User, IdentityRole>(opts => {

                opts.Password.RequiredLength = 1;

                opts.Password.RequireNonAlphanumeric = false;

                opts.Password.RequireLowercase = false;

                opts.Password.RequireUppercase = false;

                opts.Password.RequireDigit = false;

                

            })

            .AddEntityFrameworkStores<ApplicationContext>();

          
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpsRedirection();


            app.UseRouting();

            app.UseStaticFiles();

            app.UseAuthentication();
            app.UseAuthorization();
            
            

            app.UseEndpoints(endpoints =>
            {
                    endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                
                endpoints.MapHub<ChatHub>("/chat");
                endpoints.MapRazorPages();
            });
        }
    }
}
