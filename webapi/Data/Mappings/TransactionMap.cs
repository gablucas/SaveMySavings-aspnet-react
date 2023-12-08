using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SaveMySavings.Models;

namespace SaveMySavings.Data.Mappings;

public class TransactionMap : IEntityTypeConfiguration<Transaction>
{
    public void Configure(EntityTypeBuilder<Transaction> builder)
    {
        builder.ToTable("Transaction");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id)
            .ValueGeneratedOnAdd()
            .UseIdentityColumn();

        builder.Property(x => x.Title)
            .IsRequired()
            .HasColumnName("Title")
            .HasColumnType("NVARCHAR")
            .HasMaxLength(80);

        builder.Property(x => x.Amount)
            .IsRequired()
            .HasColumnName("Amount")
            .HasColumnType("DECIMAL(10, 2)");

        builder.Property(x => x.InitialDate)
            .IsRequired()
            .HasColumnName("InitialDate")
            .HasColumnType("DATETIME");

        builder.HasOne(x => x.Type)
            .WithMany(x => x.Transactions)
            .HasForeignKey(x => x.TypeId)
            .HasConstraintName("FK_Transaction_Type")
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Category)
            .WithMany(x => x.Transactions)
            .HasForeignKey(x => x.CategoryId)
            .HasConstraintName("FK_Transaction_Category")
            .OnDelete(DeleteBehavior.Restrict);
    }
}

