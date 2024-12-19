namespace AgriRegistry.Models
{
    public class Location
    {
        public int Id { get; set; }
        public required string FullAddress { get; set; }
        public string Kampong { get; set; }
        public string District { get; set; }
        public List<Farm> Farms { get; set; }
    }
}