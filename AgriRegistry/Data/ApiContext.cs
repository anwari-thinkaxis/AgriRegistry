using AgriRegistry.Models;
using Microsoft.EntityFrameworkCore;

namespace AgriRegistry.Data
{
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options) : base(options)
        {
        }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Farm> Farms { get; set; }
        
    }
}
