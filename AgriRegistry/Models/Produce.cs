using System.Text.Json.Serialization;

namespace AgriRegistry.Models;
public class Produce
{
    public int Id { get; set; } // Primary key
    public string FullName { get; set; } = string.Empty; // Name of the produce
    public int ProduceTypeId { get; set; } // Foreign key to ProduceType
    public ProduceType ProduceType { get; set; } // Navigation property
}
