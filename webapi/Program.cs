using SaveMySavings.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<SaveMysavingsDataContext>(options =>
{
    options.UseSqlServer(connectionString);
});
builder.Services.AddControllers();

var app = builder.Build();
app.MapControllers();

app.Run();



