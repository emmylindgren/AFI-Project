global using Microsoft.EntityFrameworkCore;
using AFI_Project.Data;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
	options.AddPolicy(name: MyAllowSpecificOrigins,
					  policy =>
					  {
						  policy.WithOrigins("https://localhost:44413",
											  "https://localhost:7259",
											  "https://localhost:5180")
											  .AllowAnyHeader()
											  .AllowAnyMethod();
					  });
});

// Add services to the container.

builder.Services.AddControllersWithViews()
.AddNewtonsoftJson(options =>
	options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

builder.Services.AddDbContext<Database>(options =>
	options.UseMySql(connectionString: @Config.ConnectionString,
			new MySqlServerVersion(new Version(8, 0, 27))));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(MyAllowSpecificOrigins);


app.MapControllerRoute(
	name: "default",
	pattern: "{controller}/{action=Index}/{id?}");


app.MapFallbackToFile("index.html");

app.Run();
