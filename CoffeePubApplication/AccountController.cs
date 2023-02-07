using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Text;
using Crosscutting.Users;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using SqlLiteManager;
using System.Net;

namespace CoffeePubApplication
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;

        private readonly IConfiguration _configuration;

        private readonly ISqliteRepositoryManager _sqliteRepositoryManager;

        public AccountController(ILogger<AccountController> logger, ISqliteRepositoryManager sqliteRepositoryManager, IConfiguration configuration)
        {
            this._logger = logger;
            this._sqliteRepositoryManager = sqliteRepositoryManager;
            this._configuration = configuration;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(UserLoginModel model)
        {
            //var qwe = BCrypt.Net.BCrypt.HashPassword("P@ssw0rd2"); log = admin
            //default password:  +kJw4kuckvIOX3HtFs7yiw==

            var users = await this._sqliteRepositoryManager.QueryAll<UserEntity>().ConfigureAwait(false);
            var user = users.FirstOrDefault(t => t.Username.Equals(model.Username));
            if (user != null)
            {
                if (user.Password.Equals(model.Password))
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.UniqueName, model.Username),
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this._configuration["Tokens:Key"]));
                    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(this._configuration["Tokens:Issuer"],
                        this._configuration["Tokens:Issuer"],
                        claims,
                        expires: DateTime.Now.AddMinutes(30),
                        signingCredentials: credentials);

                    return this.Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = new DateTimeOffset(token.ValidTo).ToUnixTimeMilliseconds(),
                        username = model.Username,
                    });
                }
            }
            return this.Unauthorized("Invalid username or password");
        }

        [HttpPost]
        [Route("change")]
        [Authorize]
        public async Task<IActionResult> ChangePassword(ChangePasswordModel model)
        {
            var currentUser = this.User;
            var users = await this._sqliteRepositoryManager.QueryAll<UserEntity>().ConfigureAwait(false);
            var user = users.FirstOrDefault(t => t.Username.Equals(model.Username));
            if (user != null)
            {
                if (user.Password.Equals(model.OldPassword))
                {
                    if (model.NewPassword.Equals(model.ConfirmNewPassword))
                    {
                        user.Password = model.NewPassword;
                        await this._sqliteRepositoryManager.Update(user, user.Guid).ConfigureAwait(false);
                        return this.Ok();
                    }
                    return Unauthorized("New password not equal confirm password");
                }
                return Unauthorized("Old password is incorrect");
            }
            return Unauthorized("Invalid username or password");
        }

        [HttpPost]
        [Route("registeruser")]
        public async Task RegisterUser(UserLoginModel model)
        {
            var entity = new UserEntity()
            {
                Guid = Guid.NewGuid().ToString(),
                Created = DateTime.Now,
                Username = model.Username,
                Password = model.Password
            };

            await this._sqliteRepositoryManager.Create(entity).ConfigureAwait(false);
        }
    }
}