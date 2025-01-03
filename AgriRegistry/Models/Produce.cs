using System.Text.Json.Serialization;

namespace AgriRegistry.Models;
public class Produce
{
    public int Id { get; set; } // Primary key
    public string FullName { get; set; } = string.Empty;
    public int ReportEntryId { get; set; } // Foreign key
    [JsonIgnore]
    public ReportEntry? ReportEntry { get; set; } // Navigation property
}