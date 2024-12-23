using AgriRegistry.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore; // IdentityDbContext
using Microsoft.EntityFrameworkCore;

namespace AgriRegistry.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext<ApplicationUser>(options) 
    {
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder); // Important for Identity to work

            // Customize FarmManager (Identity User) properties
            builder.Entity<ApplicationUser>();

            // You can still set the default schema for your custom entities (Farms, Locations)
            builder.HasDefaultSchema("dbo");
        }

        // Custom DbSets for your application entities
        public DbSet<Location> Locations { get; set; }
        public DbSet<Farm> Farms { get; set; }
    }
}
