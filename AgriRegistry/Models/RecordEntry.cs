using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AgriRegistry.Models;
public class RecordEntry
{
    [Key]
    public int Id { get; set; } // Primary key

    public int ProduceId { get; set; } // Foreign key
    public Produce? Produce { get; set; } // Navigation property

    public int RecordId { get; set; } // Foreign key
    [JsonIgnore]
    public Record? Record { get; set; }

    public double Quantity { get; set; }
}
