namespace AgriRegistry.Models
{
    public class Location
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        public List<Farm> Farms { get; set; }
    }
}