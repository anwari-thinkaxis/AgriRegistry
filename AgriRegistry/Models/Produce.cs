using System.Text.Json.Serialization;

namespace AgriRegistry.Models;
public class Produce
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public int ProduceTypeId { get; set; } // Foreign key
    public ProduceType ProduceType { get; set; } // Navigation property
    public int ReportEntryId { get; set; }
    [JsonIgnore]
    public ReportEntry? ReportEntry { get; set; }
}
