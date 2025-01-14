using System.Text.Json.Serialization;

namespace AgriRegistry.Models;
public class Location
{
    public int Id { get; set; }
    public string FarmManagerId { get; set; } = null!;

    // Make FullAddress and DistrictId optional for partial updates
    public string? FullAddress { get; set; } // Nullable
    public int? DistrictId { get; set; } // Nullable

    // Optional navigation property, make it nullable
    public District? District { get; set; }
    public List<Farm> Farms { get; set; } = new List<Farm>();
}
