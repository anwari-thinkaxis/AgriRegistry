using System.Text.Json.Serialization;

namespace AgriRegistry.Models;

public class Record
{
    public int Id { get; set; } // Primary key
    public int FarmId { get; set; } // Foreign key
    [JsonIgnore] // Prevent circular references
    public Farm? Farm { get; set; } // Navigation property
    public DateTime DateSubmitted { get; set; }
    public List<RecordEntry> RecordEntries { get; set; } = new List<RecordEntry>();
}