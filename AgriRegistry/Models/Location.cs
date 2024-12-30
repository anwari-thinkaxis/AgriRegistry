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
        public List<Farm> Farms { get; set; } = new List<Farm>();
    }
}
