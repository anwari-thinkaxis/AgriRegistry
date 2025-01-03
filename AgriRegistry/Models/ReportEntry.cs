using System.Text.Json.Serialization;

namespace AgriRegistry.Models;
public class ReportEntry
{
    public int Id { get; set; } // Primary key
    public Produce? Produce { get; set; } // One-to-one navigation property
    public int ReportId { get; set; } // Foreign key
    [JsonIgnore]
    public Report? Report { get; set; }
    public double Quantity { get; set; }
}