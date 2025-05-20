using RTC_CMS.Repositories;
using Microsoft.EntityFrameworkCore;
using RTC_CMS.Models.Context;
using System.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<rtc_cmsContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

builder.Services.AddTransient<IDbConnection>(sp =>
    new MySql.Data.MySqlClient.MySqlConnection(
        builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

builder.Services.AddAuthentication("RTC_CMS_Cookie")
    .AddCookie("RTC_CMS_Cookie", options =>
    {
        options.LoginPath = "/login";
        options.AccessDeniedPath = "/unauthorized";
    });

// Add services to the container.
builder.Services.AddScoped<IGenericRepo, GenericRepo>();
builder.Services.AddControllersWithViews();
builder.Services.AddCors();
var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();
app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod());
app.UseStaticFiles();

app.UseSession();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();