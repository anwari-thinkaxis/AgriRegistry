using AgriRegistry.Data;
using AgriRegistry.Services;
using AspNetCore.Identity.Database;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();
builder.Services.AddAuthentication().AddCookie(IdentityConstants.ApplicationScheme).AddBearerToken(IdentityConstants.BearerScheme);

builder.Services.AddIdentityCore<FarmManager>().AddEntityFrameworkStores<ApplicationDbContext>().AddApiEndpoints();



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
app.UseAuthorization();

// Map controllers (API endpoints)
app.MapControllers();

// Catch-all route to serve the React app (for SPA navigation)
app.MapFallbackToFile("index.html");

app.MapIdentityApi<FarmManager>();

app.Run();
