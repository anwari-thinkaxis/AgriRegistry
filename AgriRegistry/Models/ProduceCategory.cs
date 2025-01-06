using System.Text.Json.Serialization;

namespace AgriRegistry.Models;
public class ProduceCategory
{
    public int Id { get; set; } // Primary key
    public string Name { get; set; } = string.Empty;
}
