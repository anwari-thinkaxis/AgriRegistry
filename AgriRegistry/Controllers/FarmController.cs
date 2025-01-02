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
            farm.LocationId = farm.Location.Id; // Set the new LocationId on the farm
        }
        else if (farm.LocationId <= 0) // If no LocationId and no Location is provided, return error
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

        // Build query, filtering if the user is a Farm Manager
        var locations = await _context.Locations
            .Include(l => l.Farms)
            .Include(l => l.District)
            .Where(l => !User.IsInRole("FarmManager") || l.FarmManagerId == userId)
            .Select(l => new
            {
                l.Id,
                l.FullAddress,
                l.DistrictId,
                DistrictName = l.District.Name,
                Farms = l.Farms.Select(f => new { f.Id, f.Name }).ToList()
            })
            .ToListAsync();

        return Ok(locations);
    }

    // Read by ID
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var farm = await _context.Farms
            .Include(f => f.Reports) // Include related reports
            .FirstOrDefaultAsync(f => f.Id == id);

        if (farm == null)
            return NotFound();

        return Ok(farm);
    }

}
