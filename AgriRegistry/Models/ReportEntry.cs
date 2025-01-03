using System.Text.Json.Serialization;

namespace AgriRegistry.Models;
public class ReportEntry
{
    public int Id { get; set; } // Primary key
    public int ReportId { get; set; } // Foreign key
    [JsonIgnore] // Prevent circular references
    public Report? Report { get; set; } // Navigation property
    public double Quantity { get; set; }
}