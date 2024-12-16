using AgriRegistry.Models;
using AspNetCore.Identity.Database;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore; // IdentityDbContext
using Microsoft.EntityFrameworkCore;

namespace AgriRegistry.Data
{
    public class ApplicationDbContext : IdentityDbContext<FarmManager> // Inherit from IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder); // Important for Identity to work

            // Customize FarmManager (Identity User) properties
            builder.Entity<FarmManager>()
                .Property(x => x.Initials)
                .HasMaxLength(5); // Example of customizing FarmManager entity

            // You can still set the default schema for your custom entities (Farms, Locations)
            builder.HasDefaultSchema("dbo");
        }

        // Custom DbSets for your application entities
        public DbSet<Location> Locations { get; set; }
        public DbSet<Farm> Farms { get; set; }
    }
}
