using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AgriRegistry.Models;
using AgriRegistry.Data;
using Microsoft.AspNetCore.Authorization;

namespace AgriRegistry.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RecordEntryController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public RecordEntryController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Create
    [HttpPost]
    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> Create([FromBody] RecordEntry recordEntry)
    {
        if (recordEntry == null || recordEntry.RecordId <= 0)
        {
            return BadRequest("Invalid record data.");
        }

        var record = await _context.Records.FindAsync(recordEntry.RecordId);
        if (record == null)
        {
            return NotFound($"Record with ID {recordEntry.RecordId} not found.");
        }

        _context.RecordEntries.Add(recordEntry);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = recordEntry.Id }, recordEntry);
    }

    // Read All
    [HttpGet]
    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> GetAll()
    {
        var recordEntries = await _context.RecordEntries
            .Include(re => re.Record)
            .ToListAsync();

        return Ok(recordEntries);
    }

    // Read by ID
    [HttpGet("{id:int}")]
    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> GetById(int id)
    {
        var recordEntry = await _context.RecordEntries
            .Include(re => re.Record)
            .FirstOrDefaultAsync(re => re.Id == id);

        if (recordEntry == null)
        {
            return NotFound($"RecordEntry with ID {id} not found.");
        }

        return Ok(recordEntry);
    }
}
