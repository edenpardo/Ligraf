using System.Collections.Generic;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext( DbContextOptions options) : base(options)
        {


        }
    
        // protected override void OnModelCreating(ModelBuilder modelBuilder){
        //     base.OnModelCreating(modelBuilder);

        //      modelBuilder.Entity<Activity>().Property(i => i.PropertiesList).HasConversion(
        //         v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<Dictionary<string, string>>(v));
        // }

        public DbSet<Activity> Activities  { get; set; }
        public DbSet<Customer> Customers  { get; set; }
    }
}