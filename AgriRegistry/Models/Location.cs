using System.Text.Json.Serialization;

namespace AgriRegistry.Models
{
    public class Location
    {
        public int Id { get; set; }

        // Marking these properties as required
        public required string FullAddress { get; set; }
        public required int DistrictId { get; set; }

        // Optional navigation property, make it nullable
        public District? District { get; set; }

        // Prevent circular references, initialized to an empty list to avoid null
        [JsonIgnore]
        public List<Farm> Farms { get; set; } = new List<Farm>();
    }
}
