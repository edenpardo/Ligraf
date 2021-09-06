using API.Services;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config){
            services.AddIdentityCore<AppUser>(opt=>{
                opt.Password.RequireNonAlphanumeric=false;
            })
            .AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<AppUser>>();

            var key=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(OptionsBuilderConfigurationExtensions=>
            {
                OptionsBuilderConfigurationExtensions.TokenValidationParameters=new TokenValidationParameters
                {
                    ValidateIssuerSigningKey=true,
                    IssuerSigningKey=key,
                    ValidateIssuer=false,
                    ValidateAudience=false
                };
            });
            services.AddScoped<TokenService>();

            return services;
        }
    }
}