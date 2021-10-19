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
        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<ActivityAttendee>(x=>x.HasKey(aa=>new{aa.AppUserId,aa.ActivityId}));
            
            builder.Entity<ActivityAttendee>()
            .HasOne(u=>u.AppUser)
            .WithMany(a=>a.Activities)
            .HasForeignKey(aa=>aa.AppUserId);

            builder.Entity<ActivityAttendee>()
            .HasOne(u=>u.Activity)
            .WithMany(a=>a.Attendees)
            .HasForeignKey(aa=>aa.ActivityId);
        }
    }
}