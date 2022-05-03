using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AFI_Project.Migrations
{
    public partial class NewIntersectionTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tbl_Events_Tbl_Disabilities_DisabilityModelDi_Id",
                table: "Tbl_Events");

            migrationBuilder.DropForeignKey(
                name: "FK_Tbl_Events_Tbl_EventCategories_EventCategoryModelCat_Id",
                table: "Tbl_Events");

            migrationBuilder.DropForeignKey(
                name: "FK_Tbl_Profiles_Tbl_Disabilities_DisabilityModelDi_Id",
                table: "Tbl_Profiles");

            migrationBuilder.DropIndex(
                name: "IX_Tbl_Profiles_DisabilityModelDi_Id",
                table: "Tbl_Profiles");

            migrationBuilder.DropIndex(
                name: "IX_Tbl_Events_DisabilityModelDi_Id",
                table: "Tbl_Events");

            migrationBuilder.DropIndex(
                name: "IX_Tbl_Events_EventCategoryModelCat_Id",
                table: "Tbl_Events");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tbl_EventCategories",
                table: "Tbl_EventCategories");

            migrationBuilder.DropColumn(
                name: "DisabilityModelDi_Id",
                table: "Tbl_Profiles");

            migrationBuilder.DropColumn(
                name: "DisabilityModelDi_Id",
                table: "Tbl_Events");

            migrationBuilder.DropColumn(
                name: "EventCategoryModelCat_Id",
                table: "Tbl_Events");

            migrationBuilder.DropColumn(
                name: "Cat_Name",
                table: "Tbl_EventCategories");

            migrationBuilder.AlterColumn<int>(
                name: "Cat_Id",
                table: "Tbl_EventCategories",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<int>(
                name: "Ev_Id",
                table: "Tbl_EventCategories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tbl_EventCategories",
                table: "Tbl_EventCategories",
                columns: new[] { "Ev_Id", "Cat_Id" });

            migrationBuilder.CreateTable(
                name: "Tbl_Categories",
                columns: table => new
                {
                    Cat_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Cat_Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tbl_Categories", x => x.Cat_Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Tbl_EventDisabilities",
                columns: table => new
                {
                    Ev_Id = table.Column<int>(type: "int", nullable: false),
                    Dis_Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tbl_EventDisabilities", x => new { x.Ev_Id, x.Dis_Id });
                    table.ForeignKey(
                        name: "FK_Tbl_EventDisabilities_Tbl_Disabilities_Dis_Id",
                        column: x => x.Dis_Id,
                        principalTable: "Tbl_Disabilities",
                        principalColumn: "Di_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tbl_EventDisabilities_Tbl_Events_Ev_Id",
                        column: x => x.Ev_Id,
                        principalTable: "Tbl_Events",
                        principalColumn: "Ev_Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Tbl_ProfileDisabilities",
                columns: table => new
                {
                    Dis_Id = table.Column<int>(type: "int", nullable: false),
                    Pr_Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tbl_ProfileDisabilities", x => new { x.Dis_Id, x.Pr_Id });
                    table.ForeignKey(
                        name: "FK_Tbl_ProfileDisabilities_Tbl_Disabilities_Dis_Id",
                        column: x => x.Dis_Id,
                        principalTable: "Tbl_Disabilities",
                        principalColumn: "Di_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tbl_ProfileDisabilities_Tbl_Profiles_Pr_Id",
                        column: x => x.Pr_Id,
                        principalTable: "Tbl_Profiles",
                        principalColumn: "Pr_Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Tbl_EventCategories_Cat_Id",
                table: "Tbl_EventCategories",
                column: "Cat_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tbl_EventDisabilities_Dis_Id",
                table: "Tbl_EventDisabilities",
                column: "Dis_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tbl_ProfileDisabilities_Pr_Id",
                table: "Tbl_ProfileDisabilities",
                column: "Pr_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tbl_EventCategories_Tbl_Categories_Cat_Id",
                table: "Tbl_EventCategories",
                column: "Cat_Id",
                principalTable: "Tbl_Categories",
                principalColumn: "Cat_Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tbl_EventCategories_Tbl_Events_Ev_Id",
                table: "Tbl_EventCategories",
                column: "Ev_Id",
                principalTable: "Tbl_Events",
                principalColumn: "Ev_Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tbl_EventCategories_Tbl_Categories_Cat_Id",
                table: "Tbl_EventCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_Tbl_EventCategories_Tbl_Events_Ev_Id",
                table: "Tbl_EventCategories");

            migrationBuilder.DropTable(
                name: "Tbl_Categories");

            migrationBuilder.DropTable(
                name: "Tbl_EventDisabilities");

            migrationBuilder.DropTable(
                name: "Tbl_ProfileDisabilities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tbl_EventCategories",
                table: "Tbl_EventCategories");

            migrationBuilder.DropIndex(
                name: "IX_Tbl_EventCategories_Cat_Id",
                table: "Tbl_EventCategories");

            migrationBuilder.DropColumn(
                name: "Ev_Id",
                table: "Tbl_EventCategories");

            migrationBuilder.AddColumn<int>(
                name: "DisabilityModelDi_Id",
                table: "Tbl_Profiles",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DisabilityModelDi_Id",
                table: "Tbl_Events",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EventCategoryModelCat_Id",
                table: "Tbl_Events",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Cat_Id",
                table: "Tbl_EventCategories",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<string>(
                name: "Cat_Name",
                table: "Tbl_EventCategories",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tbl_EventCategories",
                table: "Tbl_EventCategories",
                column: "Cat_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tbl_Profiles_DisabilityModelDi_Id",
                table: "Tbl_Profiles",
                column: "DisabilityModelDi_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tbl_Events_DisabilityModelDi_Id",
                table: "Tbl_Events",
                column: "DisabilityModelDi_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tbl_Events_EventCategoryModelCat_Id",
                table: "Tbl_Events",
                column: "EventCategoryModelCat_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tbl_Events_Tbl_Disabilities_DisabilityModelDi_Id",
                table: "Tbl_Events",
                column: "DisabilityModelDi_Id",
                principalTable: "Tbl_Disabilities",
                principalColumn: "Di_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tbl_Events_Tbl_EventCategories_EventCategoryModelCat_Id",
                table: "Tbl_Events",
                column: "EventCategoryModelCat_Id",
                principalTable: "Tbl_EventCategories",
                principalColumn: "Cat_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tbl_Profiles_Tbl_Disabilities_DisabilityModelDi_Id",
                table: "Tbl_Profiles",
                column: "DisabilityModelDi_Id",
                principalTable: "Tbl_Disabilities",
                principalColumn: "Di_Id");
        }
    }
}
