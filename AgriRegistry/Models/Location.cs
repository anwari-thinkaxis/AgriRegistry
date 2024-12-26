namespace AgriRegistry.Models
{
    public class Location
    {
        public int Id { get; set; }
        public required string FullAddress { get; set; }
        public required int DistrictId { get; set; }
        public District District { get; set; }
        public List<Farm> Farms { get; set; }
    }
}