using SaveMySavings.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SaveMySavings.Data.Mappings;

public class TransactionCategoryMap : IEntityTypeConfiguration<TransactionCategory>
{
    public void Configure(EntityTypeBuilder<TransactionCategory> builder)
    {
        builder.ToTable("TransactionCategory");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id)
            .ValueGeneratedOnAdd()
            .UseIdentityColumn();

        builder.Property(x => x.Name)
            .IsRequired()
            .HasColumnName("Name")
            .HasColumnType("NVARCHAR")
            .HasMaxLength(80);

        builder.HasData(
            new TransactionCategory { Id = 1, Name = "Lazer" },
            new TransactionCategory { Id = 2, Name = "Casa" },
            new TransactionCategory { Id = 3, Name = "Educação" },
            new TransactionCategory { Id = 4, Name = "Alimentação" },
            new TransactionCategory { Id = 6, Name = "Carro" },
            new TransactionCategory { Id = 7, Name = "Contas" },
            new TransactionCategory { Id = 5, Name = "Outros" }
        );
    }
}