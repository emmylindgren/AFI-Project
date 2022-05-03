using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AFI_Project.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Tbl_Disabilities",
                columns: table => new
                {
                    Di_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Di_Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tbl_Disabilities", x => x.Di_Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Tbl_EventCategories",
                columns: table => new
                {
                    Cat_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Cat_Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tbl_EventCategories", x => x.Cat_Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Tbl_Profiles",
                columns: table => new
                {
                    Pr_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Pr_Firstname = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Pr_Lastname = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Pr_BirthDate = table.Column<DateTime>(type: "Date", nullable: false),
                    Pr_Street = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Pr_PostalCode = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Pr_City = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Pr_Img = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DisabilityModelDi_Id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tbl_Profiles", x => x.Pr_Id);
                    table.ForeignKey(
                        name: "FK_Tbl_Profiles_Tbl_Disabilities_DisabilityModelDi_Id",
                        column: x => x.DisabilityModelDi_Id,
                        principalTable: "Tbl_Disabilities",
                        principalColumn: "Di_Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Tbl_Events",
                columns: table => new
                {
                    Ev_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Ev_Title = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Ev_Private = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Ev_Img = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Ev_Street = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Ev_PostalCode = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Ev_City = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Ev_Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Ev_DateTime = table.Column<DateTime>(type: "Date", nullable: false),
                    Ev_OwnerPr_Id = table.Column<int>(type: "int", nullable: false),
                    DisabilityModelDi_Id = table.Column<int>(type: "int", nullable: true),
                    EventCategoryModelCat_Id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tbl_Events", x => x.Ev_Id);
                    table.ForeignKey(
                        name: "FK_Tbl_Events_Tbl_Disabilities_DisabilityModelDi_Id",
                        column: x => x.DisabilityModelDi_Id,
                        principalTable: "Tbl_Disabilities",
                        principalColumn: "Di_Id");
                    table.ForeignKey(
                        name: "FK_Tbl_Events_Tbl_EventCategories_EventCategoryModelCat_Id",
                        column: x => x.EventCategoryModelCat_Id,
                        principalTable: "Tbl_EventCategories",
                        principalColumn: "Cat_Id");
                    table.ForeignKey(
                        name: "FK_Tbl_Events_Tbl_Profiles_Ev_OwnerPr_Id",
                        column: x => x.Ev_OwnerPr_Id,
                        principalTable: "Tbl_Profiles",
                        principalColumn: "Pr_Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Tbl_Attendees",
                columns: table => new
                {
                    Ev_Id = table.Column<int>(type: "int", nullable: false),
                    Pr_Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tbl_Attendees", x => new { x.Ev_Id, x.Pr_Id });
                    table.ForeignKey(
                        name: "FK_Tbl_Attendees_Tbl_Events_Ev_Id",
                        column: x => x.Ev_Id,
                        principalTable: "Tbl_Events",
                        principalColumn: "Ev_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tbl_Attendees_Tbl_Profiles_Pr_Id",
                        column: x => x.Pr_Id,
                        principalTable: "Tbl_Profiles",
                        principalColumn: "Pr_Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Tbl_DeclinedInvites",
                columns: table => new
                {
                    Ev_Id = table.Column<int>(type: "int", nullable: false),
                    Pr_Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tbl_DeclinedInvites", x => new { x.Ev_Id, x.Pr_Id });
                    table.ForeignKey(
                        name: "FK_Tbl_DeclinedInvites_Tbl_Events_Ev_Id",
                        column: x => x.Ev_Id,
                        principalTable: "Tbl_Events",
                        principalColumn: "Ev_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tbl_DeclinedInvites_Tbl_Profiles_Pr_Id",
                        column: x => x.Pr_Id,
                        principalTable: "Tbl_Profiles",
                        principalColumn: "Pr_Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Tbl_Interested",
                columns: table => new
                {
                    Ev_Id = table.Column<int>(type: "int", nullable: false),
                    Pr_Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tbl_Interested", x => new { x.Ev_Id, x.Pr_Id });
                    table.ForeignKey(
                        name: "FK_Tbl_Interested_Tbl_Events_Ev_Id",
                        column: x => x.Ev_Id,
                        principalTable: "Tbl_Events",
                        principalColumn: "Ev_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tbl_Interested_Tbl_Profiles_Pr_Id",
                        column: x => x.Pr_Id,
                        principalTable: "Tbl_Profiles",
                        principalColumn: "Pr_Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Tbl_RequestedInvites",
                columns: table => new
                {
                    Ev_Id = table.Column<int>(type: "int", nullable: false),
                    Pr_Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tbl_RequestedInvites", x => new { x.Ev_Id, x.Pr_Id });
                    table.ForeignKey(
                        name: "FK_Tbl_RequestedInvites_Tbl_Events_Ev_Id",
                        column: x => x.Ev_Id,
                        principalTable: "Tbl_Events",
                        principalColumn: "Ev_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tbl_RequestedInvites_Tbl_Profiles_Pr_Id",
                        column: x => x.Pr_Id,
                        principalTable: "Tbl_Profiles",
                        principalColumn: "Pr_Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Tbl_Attendees_Pr_Id",
                table: "Tbl_Attendees",
                column: "Pr_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tbl_DeclinedInvites_Pr_Id",
                table: "Tbl_DeclinedInvites",
                column: "Pr_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tbl_Events_DisabilityModelDi_Id",
                table: "Tbl_Events",
                column: "DisabilityModelDi_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tbl_Events_Ev_OwnerPr_Id",
                table: "Tbl_Events",
                column: "Ev_OwnerPr_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tbl_Events_EventCategoryModelCat_Id",
                table: "Tbl_Events",
                column: "EventCategoryModelCat_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tbl_Interested_Pr_Id",
                table: "Tbl_Interested",
                column: "Pr_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tbl_Profiles_DisabilityModelDi_Id",
                table: "Tbl_Profiles",
                column: "DisabilityModelDi_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tbl_RequestedInvites_Pr_Id",
                table: "Tbl_RequestedInvites",
                column: "Pr_Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tbl_Attendees");

            migrationBuilder.DropTable(
                name: "Tbl_DeclinedInvites");

            migrationBuilder.DropTable(
                name: "Tbl_Interested");

            migrationBuilder.DropTable(
                name: "Tbl_RequestedInvites");

            migrationBuilder.DropTable(
                name: "Tbl_Events");

            migrationBuilder.DropTable(
                name: "Tbl_EventCategories");

            migrationBuilder.DropTable(
                name: "Tbl_Profiles");

            migrationBuilder.DropTable(
                name: "Tbl_Disabilities");
        }
    }
}
