﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SaveMySavings.Data;

#nullable disable

namespace SaveMySavings.Migrations
{
    [DbContext(typeof(SaveMysavingsDataContext))]
    [Migration("20231207195723_InitialCreation")]
    partial class InitialCreation
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("SaveMySavings.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(80)
                        .HasColumnType("NVARCHAR")
                        .HasColumnName("Name");

                    b.Property<int>("TypeId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TypeId");

                    b.ToTable("Category", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Salário",
                            TypeId = 1
                        },
                        new
                        {
                            Id = 2,
                            Name = "Investimento",
                            TypeId = 1
                        },
                        new
                        {
                            Id = 3,
                            Name = "Prêmio",
                            TypeId = 1
                        },
                        new
                        {
                            Id = 4,
                            Name = "Presente",
                            TypeId = 1
                        },
                        new
                        {
                            Id = 5,
                            Name = "Outros",
                            TypeId = 1
                        },
                        new
                        {
                            Id = 6,
                            Name = "Casa",
                            TypeId = 2
                        },
                        new
                        {
                            Id = 7,
                            Name = "Educação",
                            TypeId = 2
                        },
                        new
                        {
                            Id = 8,
                            Name = "Eletrônicos",
                            TypeId = 2
                        },
                        new
                        {
                            Id = 9,
                            Name = "Lazer",
                            TypeId = 2
                        },
                        new
                        {
                            Id = 10,
                            Name = "Restaurante",
                            TypeId = 2
                        },
                        new
                        {
                            Id = 11,
                            Name = "Saúde",
                            TypeId = 2
                        },
                        new
                        {
                            Id = 12,
                            Name = "Serviços",
                            TypeId = 2
                        },
                        new
                        {
                            Id = 13,
                            Name = "Supermercado",
                            TypeId = 2
                        },
                        new
                        {
                            Id = 14,
                            Name = "Transporte",
                            TypeId = 2
                        },
                        new
                        {
                            Id = 15,
                            Name = "Vestuário",
                            TypeId = 2
                        },
                        new
                        {
                            Id = 16,
                            Name = "Viagem",
                            TypeId = 2
                        },
                        new
                        {
                            Id = 17,
                            Name = "Outros",
                            TypeId = 2
                        });
                });

            modelBuilder.Entity("SaveMySavings.Models.Transaction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Amount")
                        .HasColumnType("DECIMAL(10, 2)")
                        .HasColumnName("Amount");

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<DateTime>("InitialDate")
                        .HasColumnType("DATETIME")
                        .HasColumnName("InitialDate");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(80)
                        .HasColumnType("NVARCHAR")
                        .HasColumnName("Title");

                    b.Property<int>("TypeId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("TypeId");

                    b.ToTable("Transaction", (string)null);
                });

            modelBuilder.Entity("SaveMySavings.Models.Type", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(80)
                        .HasColumnType("NVARCHAR")
                        .HasColumnName("Name");

                    b.HasKey("Id");

                    b.ToTable("Type", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Receita"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Despesa"
                        });
                });

            modelBuilder.Entity("SaveMySavings.Models.Category", b =>
                {
                    b.HasOne("SaveMySavings.Models.Type", "Type")
                        .WithMany("Categories")
                        .HasForeignKey("TypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Category_Type");

                    b.Navigation("Type");
                });

            modelBuilder.Entity("SaveMySavings.Models.Transaction", b =>
                {
                    b.HasOne("SaveMySavings.Models.Category", "Category")
                        .WithMany("Transactions")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("FK_Transaction_Category");

                    b.HasOne("SaveMySavings.Models.Type", "Type")
                        .WithMany("Transactions")
                        .HasForeignKey("TypeId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("FK_Transaction_Type");

                    b.Navigation("Category");

                    b.Navigation("Type");
                });

            modelBuilder.Entity("SaveMySavings.Models.Category", b =>
                {
                    b.Navigation("Transactions");
                });

            modelBuilder.Entity("SaveMySavings.Models.Type", b =>
                {
                    b.Navigation("Categories");

                    b.Navigation("Transactions");
                });
#pragma warning restore 612, 618
        }
    }
}