using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AgriRegistry.Models;
using AgriRegistry.Data;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace AgriRegistry.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FarmController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public FarmController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Create
    [HttpPost]
    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> Create([FromBody] Farm farm)
    {
        if (farm == null)
            return BadRequest("Farm cannot be null");

        // If a nested Location is provided, create it
        if (farm.Location != null)
        {
            _context.Locations.Add(farm.Location);
            await _context.SaveChangesAsync();
            farm.LocationId = farm.Location.Id;
        }
        else if (farm.LocationId <= 0)
        {
            return BadRequest("A valid Location is required to create a Farm.");
        }

        // Proceed with creating the farm
        _context.Farms.Add(farm);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = farm.Id }, farm);
    }

    // Read All
    [HttpGet]
    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> GetAll()
    {
        // Get the current user ID
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        // Fetch locations with related data
        var locations = await _context.Locations
            .Include(l => l.Farms)
                .ThenInclude(f => f.Records) 
            .Include(l => l.District)
            .Where(l => User.IsInRole("Admin") || l.Farms.Any(f => f.FarmManagerId == userId))
            .Select(l => new
            {
                l.Id,
                l.FullAddress,
                l.DistrictId,
                DistrictName = l.District.Name,
                Farms = l.Farms.Select(f => new
                {
                    f.Id,
                    f.Name,
                    RecordCount = f.Records.Count
                }).ToList()
            })
            .ToListAsync();

        return Ok(locations);
    }


    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        // Get the current user ID
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        // Query for the specific farm with filtering on records
        var farm = await _context.Farms
            .Include(f => f.Records)
                .ThenInclude(r => r.RecordEntries)
                    .ThenInclude(re => re.Produce)
            .Where(f => User.IsInRole("Admin") || f.FarmManagerId == userId) // Filter farms
            .FirstOrDefaultAsync(f => f.Id == id);

        return Ok(farm);
    }


}
