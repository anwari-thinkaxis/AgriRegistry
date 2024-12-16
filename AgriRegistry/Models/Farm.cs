namespace AgriRegistry.Models
{
    public class Farm
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int LocationId { get; set; }
        public Location Location { get; set; }
    }
}
