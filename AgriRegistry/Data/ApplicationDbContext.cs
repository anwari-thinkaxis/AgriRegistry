using AgriRegistry.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore; // IdentityDbContext
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace AgriRegistry.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext<ApplicationUser>(options)
    {
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<ApplicationUser>();
            builder.HasDefaultSchema("dbo");

            builder.Entity<Farm>()
               .HasOne(f => f.FarmManager) // Navigation property
               .WithMany() // No back-reference in IdentityUser
               .HasForeignKey(f => f.FarmManagerId) // Foreign key
               .OnDelete(DeleteBehavior.Restrict); // Prevent cascade delete

            builder.Entity<Farm>()
                .HasOne(f => f.Location)
                .WithMany(l => l.Farms)
                .HasForeignKey(f => f.LocationId);

            builder.Entity<Location>()
               .HasOne(l => l.District)
               .WithMany()
               .HasForeignKey(l => l.DistrictId)
               .OnDelete(DeleteBehavior.Restrict);
        }

        public DbSet<Location> Locations { get; set; }
        public DbSet<Farm> Farms { get; set; }
        public DbSet<District> Districts { get; set; }
    }
}
