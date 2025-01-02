using System.Text.Json.Serialization;

namespace AgriRegistry.Models;

public class Report
{
    public int Id { get; set; }
    public int FarmId { get; set; }
    [JsonIgnore] // Prevent circular references
    public Farm? Farm { get; set; } // Nullable, indicating that it may not always be set
    public DateTime DateSubmitted { get; set; }
}
