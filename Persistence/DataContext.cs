using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext( DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities  { get; set; }
        public DbSet<Customer> Customers  { get; set; }
    }
}