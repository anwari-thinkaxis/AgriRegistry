using Microsoft.AspNetCore.Identity;

namespace AspNetCore.Identity.Database;

public class FarmManager : IdentityUser
{
    public string? Initials { get; set; }
}
