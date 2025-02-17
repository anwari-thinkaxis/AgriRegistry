﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AgriRegistry.Models;
using AgriRegistry.Data;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace AgriRegistry.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LocationController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public LocationController(ApplicationDbContext context)
    {
        _context = context;
    }

    // CREATE
    [HttpPost]
    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> Create([FromBody] Location location)
    {
        if (location == null)
            return BadRequest("Location cannot be null");

        // Validate required properties
        if (string.IsNullOrWhiteSpace(location.FullAddress))
            return BadRequest("FullAddress is required.");

        if (location.DistrictId <= 0)
            return BadRequest("A valid DistrictId is required.");

        // Ensure the District exists
        var districtExists = await _context.Districts.AnyAsync(d => d.Id == location.DistrictId);
        if (!districtExists)
            return NotFound($"District with Id {location.DistrictId} does not exist.");

        // Add location to the database
        await _context.Locations.AddAsync(location);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = location.Id }, location);
    }


    // READ ALL
    [HttpGet]
    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> GetAll()
    {
        // Get the current user
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        IQueryable<Location> query = _context.Locations
            .Include(l => l.Farms) // Include related Farms
            .Include(l => l.District); // Include related District

        // If the user is a Farm Manager, filter locations by associated farms they manage
        if (User.IsInRole("FarmManager"))
        {
            query = query.Where(location =>
                location.FarmManagerId == userId);
        }

        // Project the query to return only the required fields
        var locations = await query
            .Select(l => new
            {
                Id = l.Id,
                FullAddress = l.FullAddress,
                DistrictId = l.DistrictId,
                DistrictName = l.District != null ? l.District.Name : null,
                Farms = l.Farms.Select(f => new { Id = f.Id, Name = f.Name }).ToList()
            })
            .ToListAsync();

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
    [HttpPatch("{id:int}")]
    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> UpdatePartial(int id, Location updatedLocation)
    {
        if (updatedLocation == null)
            return BadRequest("Location data cannot be null");

        var locationInDb = await _context.Locations.FindAsync(id);
        if (locationInDb == null)
            return NotFound();

        // Update only the fields that are provided
        if (updatedLocation.DistrictId.HasValue && updatedLocation.DistrictId != locationInDb.DistrictId)
            locationInDb.DistrictId = updatedLocation.DistrictId.Value;

        if (!string.IsNullOrEmpty(updatedLocation.FullAddress) && updatedLocation.FullAddress != locationInDb.FullAddress)
            locationInDb.FullAddress = updatedLocation.FullAddress;

        _context.Entry(locationInDb).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            return Conflict("The location was modified by another user.");
        }

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
