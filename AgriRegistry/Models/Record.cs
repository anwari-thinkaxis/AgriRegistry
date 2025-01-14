using System.Text.Json.Serialization;

namespace AgriRegistry.Models;

public class Record
{
    public int Id { get; set; } 
    public int FarmId { get; set; } 
    public Farm? Farm { get; set; }
    public DateTime DateSubmitted { get; set; }
    public List<RecordEntry> RecordEntries { get; set; } = new List<RecordEntry>();
}
