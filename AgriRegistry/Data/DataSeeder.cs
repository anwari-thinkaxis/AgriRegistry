﻿using AgriRegistry.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AgriRegistry.Data;
public class DataSeeder
{
    public static async Task SeedDistrict(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>(); 

        await dbContext.Database.EnsureCreatedAsync();

        if (!await dbContext.Set<District>().AnyAsync())
        {
            var districts = new List<District>
            {
                new District { Name = "Brunei Muara" },
                new District { Name = "Tutong" },
                new District { Name = "Belait" },
                new District { Name = "Temburong" }
            };

            await dbContext.Set<District>().AddRangeAsync(districts);
            await dbContext.SaveChangesAsync();
        }
    }
    public static async Task SeedRolesAndAdminUser(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

        // Create Admin Role
        if (!await roleManager.RoleExistsAsync("Admin"))
        {
            await roleManager.CreateAsync(new IdentityRole("Admin"));
        }

        // Create FarmManager Role
        if (!await roleManager.RoleExistsAsync("FarmManager"))
        {
            await roleManager.CreateAsync(new IdentityRole("FarmManager"));
        }

        // Create an Admin User
        var adminUser = await userManager.FindByEmailAsync("admin@example.com");
        if (adminUser == null)
        {
            adminUser = new ApplicationUser
            {
                UserName = "admin@example.com",
                Email = "admin@example.com",
                EmailConfirmed = true
            };

            await userManager.CreateAsync(adminUser, "AdminPassword123!");
            await userManager.AddToRoleAsync(adminUser, "Admin");
        }

        // Create a FarmManager User
        var farmManagerUser = await userManager.FindByEmailAsync("farmmanager@example.com");
        if (farmManagerUser == null)
        {
            farmManagerUser = new ApplicationUser
            {
                UserName = "farmmanager@example.com",
                Email = "farmmanager@example.com",
                EmailConfirmed = true
            };

            await userManager.CreateAsync(farmManagerUser, "FarmManager123!");
            await userManager.AddToRoleAsync(farmManagerUser, "FarmManager");
        }
    }

}
