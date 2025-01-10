using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace AgriRegistry.Models;
public class Farm
{
    public int Id { get; set; }

    public string FarmManagerId { get; set; } = null!; // Non-nullable

    [JsonIgnore] // Prevent circular references
    public ApplicationUser FarmManager { get; set; } // Navigation property

    public required string Name { get; set; }

    public string PostalAddress { get; set; }

    public double Hectares { get; set; }

    public int LocationId { get; set; }

    [JsonIgnore] // Prevent circular references
    public Location? Location { get; set; } // Nullable, indicating that it may not always be set

    public List<Record> Records { get; set; } = new List<Record>();
}
