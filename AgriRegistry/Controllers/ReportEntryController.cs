using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AgriRegistry.Models;
using AgriRegistry.Data;
using Microsoft.AspNetCore.Authorization;

namespace AgriRegistry.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReportEntryController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ReportEntryController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Create
    [HttpPost]
    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> Create([FromBody] ReportEntry reportEntry)
    {
        if (reportEntry == null || reportEntry.ReportId <= 0)
        {
            return BadRequest("Invalid report data.");
        }

        // Ensure the report exists
        var report = await _context.Reports.FindAsync(reportEntry.ReportId);
        if (report == null)
        {
            return NotFound($"Report with ID {reportEntry.ReportId} not found.");
        }

        _context.ReportEntries.Add(reportEntry);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = reportEntry.Id }, reportEntry);
    }

    // Read All
    [HttpGet]
    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> GetAll()
    {
        var reportEntries = await _context.ReportEntries
            .Include(re => re.Report) // Include related report data
            .ToListAsync();

        return Ok(reportEntries);
    }

    // Read by ID
    [HttpGet("{id:int}")]
    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> GetById(int id)
    {
        var reportEntry = await _context.ReportEntries
            .Include(re => re.Report) // Include related report data
            .FirstOrDefaultAsync(re => re.Id == id);

        if (reportEntry == null)
        {
            return NotFound($"ReportEntry with ID {id} not found.");
        }

        return Ok(reportEntry);
    }
}
