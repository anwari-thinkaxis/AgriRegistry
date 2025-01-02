using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AgriRegistry.Models;
using AgriRegistry.Data;
using Microsoft.AspNetCore.Authorization;

namespace AgriRegistry.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReportController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ReportController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Create
    [HttpPost]
    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> Create([FromBody] Report report)
    {
        if (report == null || report.FarmId <= 0)
        {
            return BadRequest("Invalid report data.");
        }

        // Ensure the farm exists
        var farm = await _context.Farms.FindAsync(report.FarmId);
        if (farm == null)
        {
            return NotFound($"Farm with ID {report.FarmId} not found.");
        }

        report.DateSubmitted = DateTime.UtcNow; // Set submission date
        _context.Reports.Add(report);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = report.Id }, report);
    }

    // Read All
    [HttpGet]
    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> GetAll()
    {
        var reports = await _context.Reports
            .Include(r => r.Farm) // Include related farm data
            .ToListAsync();

        return Ok(reports);
    }

    // Read by ID
    [HttpGet("{id:int}")]
    [Authorize(Roles = "Admin,FarmManager")]
    public async Task<IActionResult> GetById(int id)
    {
        var report = await _context.Reports
            .Include(r => r.Farm) // Include related farm data
            .FirstOrDefaultAsync(r => r.Id == id);

        if (report == null)
        {
            return NotFound($"Report with ID {id} not found.");
        }

        return Ok(report);
    }
}
