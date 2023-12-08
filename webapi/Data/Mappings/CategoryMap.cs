using SaveMySavings.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SaveMySavings.Data.Mappings;

public class CategoryMap : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.ToTable("Category");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id)
            .ValueGeneratedOnAdd()
            .UseIdentityColumn();

        builder.Property(x => x.Name)
            .IsRequired()
            .HasColumnName("Name")
            .HasColumnType("NVARCHAR")
            .HasMaxLength(80);

        builder.HasOne(x => x.Type)
            .WithMany(x => x.Categories)
            .HasForeignKey(x => x.TypeId)
            .HasConstraintName("FK_Category_Type");

        builder.HasData(
            new Category { Id = 1, Name = "Salário", TypeId = 1 },
            new Category { Id = 2, Name = "Investimento", TypeId = 1 },
            new Category { Id = 3, Name = "Prêmio", TypeId = 1 },
            new Category { Id = 4, Name = "Presente", TypeId = 1 },
            new Category { Id = 5, Name = "Outros", TypeId = 1 },
            new Category { Id = 6, Name = "Casa", TypeId = 2 },
            new Category { Id = 7, Name = "Educação", TypeId = 2 },
            new Category { Id = 8, Name = "Eletrônicos", TypeId = 2 },
            new Category { Id = 9, Name = "Lazer", TypeId = 2 },
            new Category { Id = 10, Name = "Restaurante", TypeId = 2 },
            new Category { Id = 11, Name = "Saúde", TypeId = 2 },
            new Category { Id = 12, Name = "Serviços", TypeId = 2 },
            new Category { Id = 13, Name = "Supermercado", TypeId = 2 },
            new Category { Id = 14, Name = "Transporte", TypeId = 2 },
            new Category { Id = 15, Name = "Vestuário", TypeId = 2 },
            new Category { Id = 16, Name = "Viagem", TypeId = 2 },
            new Category { Id = 17, Name = "Outros", TypeId = 2 }
        );
    }
}