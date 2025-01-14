using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AgriRegistry.Models;
using AgriRegistry.Data;
using Microsoft.AspNetCore.Authorization;

namespace AgriRegistry.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RecordController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public RecordController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Create
    [HttpPost]
    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> Create([FromBody] Record record)
    {
        if (record == null || record.FarmId <= 0)
        {
            return BadRequest("Invalid record data.");
        }

        // Ensure the farm exists
        var farm = await _context.Farms.FindAsync(record.FarmId);
        if (farm == null)
        {
            return NotFound($"Farm with ID {record.FarmId} not found.");
        }

        record.DateSubmitted = DateTime.UtcNow; 
        _context.Records.Add(record);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = record.Id }, record);
    }

    // Read All
    [HttpGet]
    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> GetAll()
    {
        var records = await _context.Records
            .Include(f => f.RecordEntries) 
            .ToListAsync();

        return Ok(records);
    }

    // Read by ID
    [HttpGet("{id:int}")]
    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> GetById(int id)
    {
        var record = await _context.Records
            .Include(r => r.Farm) 
            .Include(r => r.RecordEntries) 
                .ThenInclude(re => re.Produce) 
            .FirstOrDefaultAsync(r => r.Id == id);

        if (record == null)
        {
            return NotFound($"Record with ID {id} not found.");
        }

        return Ok(record);
    }



}
