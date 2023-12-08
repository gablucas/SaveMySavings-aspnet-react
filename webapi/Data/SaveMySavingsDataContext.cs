using Microsoft.EntityFrameworkCore;
using SaveMySavings.Models;
using SaveMySavings.Data.Mappings;

namespace SaveMySavings.Data;

public class SaveMysavingsDataContext : DbContext
{
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<Models.Type> Type { get; set; }
    public DbSet<Category> Category { get; set; }

    public SaveMysavingsDataContext(DbContextOptions<SaveMysavingsDataContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new TransactionMap());
        modelBuilder.ApplyConfiguration(new TypeMap());
        modelBuilder.ApplyConfiguration(new CategoryMap());
    }
}