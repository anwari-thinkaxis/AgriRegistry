using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AgriRegistry.Models;
using AgriRegistry.Data;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace AgriRegistry.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProduceController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProduceController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Create
    [HttpPost]
    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> Create([FromBody] Produce produce)
    {
        if (produce == null)
        {
            return BadRequest("Invalid produce data.");
        }

        // Ensure the related ProduceType exists
        var produceTypeExists = await _context.ProduceTypes.AnyAsync(pt => pt.Id == produce.ProduceTypeId);
        if (!produceTypeExists)
        {
            return NotFound($"ProduceType with ID {produce.ProduceTypeId} not found.");
        }

        _context.Produces.Add(produce);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = produce.Id }, produce);
    }

    // Read All
    [HttpGet]
    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> GetAll()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        // Filter based on roles
        var produces = await _context.Produces
            .Include(p => p.ProduceType)
                .ThenInclude(pt => pt.ProduceCategory)
            .Include(p => p.FarmManager)
            .Where(p => User.IsInRole("Admin") || p.FarmManagerId == userId)
            .ToListAsync();

        return Ok(produces);
    }

    // Read by ID
    [HttpGet("{id:int}")]
    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> GetById(int id)
    {
        var produce = await _context.Produces
            .Include(p => p.ProduceType) // Include related ProduceType data
            .FirstOrDefaultAsync(p => p.Id == id);

        return Ok(produce);
    }

    // Update
    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> Update(int id, [FromBody] Produce produce)
    {
        if (id != produce.Id)
        {
            return BadRequest("Produce ID mismatch.");
        }

        var existingProduce = await _context.Produces.FindAsync(id);
        if (existingProduce == null)
        {
            return NotFound($"Produce with ID {id} not found.");
        }

        // Ensure the related ProduceType exists
        var produceTypeExists = await _context.ProduceTypes.AnyAsync(pt => pt.Id == produce.ProduceTypeId);
        if (!produceTypeExists)
        {
            return NotFound($"ProduceType with ID {produce.ProduceTypeId} not found.");
        }

        existingProduce.FullName = produce.FullName;
        existingProduce.ProduceTypeId = produce.ProduceTypeId;

        _context.Entry(existingProduce).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // Delete
    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var produce = await _context.Produces.FindAsync(id);
        if (produce == null)
        {
            return NotFound($"Produce with ID {id} not found.");
        }

        _context.Produces.Remove(produce);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
