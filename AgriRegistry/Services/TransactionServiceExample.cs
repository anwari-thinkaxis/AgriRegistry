using System;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using AgriRegistry.Data;
using AgriRegistry.Models;

namespace AgriRegistry.Services
{
    public class TransactionServiceExample
    {
        private readonly ApplicationDbContext _context;

        public TransactionServiceExample(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task ExecuteLocationTransactionAsync()
        {
            // Begin a transaction
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // Step 1: Insert a new Location (do not manually set the Id)
                var newLocation = new Location { Name = "Farm 4" };  // Let the Id be auto-generated
                _context.Locations.Add(newLocation);
                await _context.SaveChangesAsync();

                // Step 2: Update the Location
                newLocation.Name = "Updated Farm 4";
                _context.Locations.Update(newLocation);
                await _context.SaveChangesAsync();

                // Commit the transaction if successful
                await transaction.CommitAsync();
                Console.WriteLine("Transaction committed successfully.");
            }
            catch (Exception ex)
            {
                // Rollback the transaction if any error occurs
                await transaction.RollbackAsync();
                Console.WriteLine($"Transaction rolled back. Error: {ex.Message}");
            }
        }
    }
}
