using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AgriRegistry.Models;
using AgriRegistry.Data;
using Microsoft.AspNetCore.Authorization;

namespace AgriRegistry.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LocationsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public LocationsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // CREATE
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create(Location location)
    {
        if (location == null)
            return BadRequest("Location cannot be null");

        await _context.Locations.AddAsync(location);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = location.Id }, location);
    }

    // READ ALL
    [HttpGet]

    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> GetAll()
    {
        var locations = await _context.Locations.Include(l => l.Farms).ToListAsync();
        return Ok(locations);
    }

    // READ BY ID
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var location = await _context.Locations.Include(l => l.Farms).FirstOrDefaultAsync(l => l.Id == id);

        if (location == null)
            return NotFound();

        return Ok(location);
    }

    // UPDATE
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, Location updatedLocation)
    {
        if (id != updatedLocation.Id)
            return BadRequest("ID mismatch");

        var locationInDb = await _context.Locations.FindAsync(id);

        if (locationInDb == null)
            return NotFound();

        locationInDb.FullAddress = updatedLocation.FullAddress;
        locationInDb.Farms = updatedLocation.Farms;

        _context.Entry(locationInDb).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return Ok(locationInDb);
    }

    // DELETE
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var locationInDb = await _context.Locations.FindAsync(id);

        if (locationInDb == null)
            return NotFound();

        _context.Locations.Remove(locationInDb);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
