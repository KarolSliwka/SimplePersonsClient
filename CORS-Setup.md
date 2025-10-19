# CORS Configuration for ASP.NET Core API

To allow the Angular frontend to communicate with your ASP.NET Core API, you need to configure CORS (Cross-Origin Resource Sharing).

## Add CORS to your Program.cs

Add the following code to your `Program.cs` file in the ASP.NET Core project:

```csharp
// Add this after var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Angular dev server
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Add this after var app = builder.Build(); and before app.Run();
app.UseCors("AllowAngularApp");
```

## Complete Program.cs Example

```csharp
using Microsoft.EntityFrameworkCore;
using MyProject.DbServices;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Entity Framework
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add your custom services
builder.Services.AddScoped<IPersonService, PersonService>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use CORS (must be before UseAuthorization)
app.UseCors("AllowAngularApp");

app.UseAuthorization();
app.MapControllers();

app.Run();
```

## For Production

For production deployment, update the CORS origins to include your production domain:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins(
                "http://localhost:4200",           // Development
                "https://yourproductiondomain.com" // Production
              )
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});
```

## Testing CORS

1. Start your ASP.NET Core API (usually runs on https://localhost:7157)
2. Start the Angular application (`ng serve` - runs on http://localhost:4200)
3. Open the Angular app in your browser
4. The API calls should work without CORS errors

If you still see CORS errors, check:
- The CORS policy is added before `app.Run()`
- The Angular dev server URL matches the origin in CORS policy
- The API is running and accessible