using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SaveMySavings.Data.Mappings;

public class TypeMap : IEntityTypeConfiguration<Models.Type>
{
    public void Configure(EntityTypeBuilder<Models.Type> builder)
    {
        builder.ToTable("Type");

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
            new Models.Type { Id = 1, Name = "Receita" },
            new Models.Type { Id = 2, Name = "Despesa" }
        );
    }
}