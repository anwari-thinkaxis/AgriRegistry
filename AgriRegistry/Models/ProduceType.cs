using System.Text.Json.Serialization;

namespace AgriRegistry.Models;
public class ProduceType
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int ProduceCategoryId { get; set; } // Foreign key
    public ProduceCategory ProduceCategory { get; set; } // Navigation property
}
