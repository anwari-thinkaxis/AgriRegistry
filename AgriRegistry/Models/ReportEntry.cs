using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AgriRegistry.Models;
public class ReportEntry
{
    [Key]
    public int Id { get; set; } // Primary key

    public int ProduceId { get; set; } // Foreign key
    public Produce? Produce { get; set; } // Navigation property

    public int ReportId { get; set; } // Foreign key
    [JsonIgnore]
    public Report? Report { get; set; }

    public double Quantity { get; set; }
}
