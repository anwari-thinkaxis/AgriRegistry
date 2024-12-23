using AgriRegistry.Data;
using AgriRegistry.Models;
using AgriRegistry.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.SignIn.RequireConfirmedEmail = false; // Disable email confirmation
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders()
.AddDefaultUI();


// Configure JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])
        )
    };
});


builder.Services.AddAuthorization();


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5001") // Allow React app in development (localhost)
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials(); // If needed for cookies/authentication
    });
});

// Transaction
builder.Services.AddScoped<TransactionServiceExample>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<IEmailSender, EmailSender>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Developer exception page (detailed error information for debugging)
    app.UseDeveloperExceptionPage();

    // Serve Swagger UI for API documentation in development
    app.UseSwagger();
    app.UseSwaggerUI();

    // Serve static files for the React app
    app.UseDefaultFiles();
    app.UseStaticFiles();
}
else
{
    // Serve Swagger UI in production (optional, useful for debugging)
    app.UseSwagger();
    app.UseSwaggerUI();

    // Serve static files for the React app
    app.UseDefaultFiles();
    app.UseStaticFiles();

    // In production, handle errors gracefully (no stack traces, just generic error page)
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection(); // Redirect to HTTPS if HTTP is used
app.UseCors("AllowReactApp");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

// Map controllers (API endpoints)
app.MapControllers();

app.MapIdentityApi<ApplicationUser>();


// Catch-all route to serve the React app (for SPA navigation)
app.MapFallbackToFile("index.html");

using (var scope = app.Services.CreateScope())
{
    await DataSeeder.SeedRolesAndAdminUser(scope.ServiceProvider);
}

app.Run();

