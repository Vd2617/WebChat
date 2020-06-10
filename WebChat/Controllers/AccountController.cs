using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using WebChat.Models;
using static WebChat.Models.LoginView;

namespace WebChat.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }
      
        [HttpPost]
        public async Task<IActionResult> Register(RegisterView model)
        {
            if (ModelState.IsValid)
            {
                User user = new User { Email = model.Email, UserName = model.UserName };
               
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                   
                    await _signInManager.SignInAsync(user, false);
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                }
            }
            
            return View(model);
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View("~/Views/Account/Login.cshtml");
        }

        [HttpPost]
     
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                User signedUser = await _userManager.FindByEmailAsync(model.Email);
                
                var result =
                    await _signInManager.PasswordSignInAsync(signedUser.UserName, model.Password, model.RememberMe, false);
                if (result.Succeeded)
                {
                    return RedirectToAction("Index", "Home");  
                }
                else
                {
                    ModelState.AddModelError("", "Login or password faild");
                }
            }
            return View("~/Views/Account/Login.cshml",model);
        }

        [HttpGet]
        
        public async Task<ActionResult> Logout()
         {

            await UpdateAccauntLastVisit(User.Identity.Name);
            await _signInManager.SignOutAsync();

            return RedirectToAction("Index", "Home");
         }
        public async Task<IdentityResult> UpdateAccauntLastVisit(string userName)

        {
            if (userName.Length == 0) return null;
            User user = await _userManager.FindByNameAsync(userName);

            user.Lastvisit = DateTime.Now;

            return await _userManager.UpdateAsync(user);

        }
    }
}
