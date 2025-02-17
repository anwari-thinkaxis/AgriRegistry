﻿using AgriRegistry.Models;
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

            builder.Entity<Record>()
                .HasOne(r => r.Farm) // Specify navigation property explicitly
                .WithMany(f => f.Records) // Reciprocal relationship
                .HasForeignKey(r => r.FarmId) // Scalar foreign key
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<RecordEntry>()
                .HasOne(re => re.Record) // Specify navigation property explicitly
                .WithMany(r => r.RecordEntries) // Reciprocal relationship
                .HasForeignKey(re => re.RecordId) // Scalar foreign key
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<RecordEntry>()
                .HasOne(re => re.Produce)
                .WithMany() // Allow many RecordEntry records to reference the same Produce
                .HasForeignKey(re => re.ProduceId)
                .OnDelete(DeleteBehavior.Restrict); // Prevent deleting Produce if referenced by RecordEntry


            builder.Entity<Produce>()
                .HasOne(p => p.ProduceType)
                .WithMany() // Allow many-to-one relationship if needed
                .HasForeignKey(p => p.ProduceTypeId) // Separate FK column
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<ProduceType>()
                .HasOne(pt => pt.ProduceCategory)
                .WithMany() // Allow many-to-one relationship if needed
                .HasForeignKey(pt => pt.ProduceCategoryId) // Separate FK column
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Produce>()
                .HasOne(f => f.FarmManager)
                .WithMany()
                .HasForeignKey(f => f.FarmManagerId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Produce>()
                .HasIndex(p => new { p.FarmManagerId, p.FullName })
                .IsUnique();
        }

        public DbSet<Location> Locations { get; set; }
        public DbSet<Farm> Farms { get; set; }
        public DbSet<Record> Records { get; set; }
        public DbSet<RecordEntry> RecordEntries { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Produce> Produces { get; set; }
        public DbSet<ProduceType> ProduceTypes { get; set; }
        public DbSet<ProduceCategory> ProduceCategories { get; set; }
    }
}
