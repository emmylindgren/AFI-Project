using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AFI_Project.Migrations
{
    public partial class AddedCommentsAndPosts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tbl_Posts",
                columns: table => new
                {
                    Po_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Po_Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Po_OwnerPr_Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tbl_Posts", x => x.Po_Id);
                    table.ForeignKey(
                        name: "FK_Tbl_Posts_Tbl_Profiles_Po_OwnerPr_Id",
                        column: x => x.Po_OwnerPr_Id,
                        principalTable: "Tbl_Profiles",
                        principalColumn: "Pr_Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Tbl_Comments",
                columns: table => new
                {
                    Co_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Co_Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Co_OwnerPr_Id = table.Column<int>(type: "int", nullable: false),
                    PostModelPo_Id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tbl_Comments", x => x.Co_Id);
                    table.ForeignKey(
                        name: "FK_Tbl_Comments_Tbl_Posts_PostModelPo_Id",
                        column: x => x.PostModelPo_Id,
                        principalTable: "Tbl_Posts",
                        principalColumn: "Po_Id");
                    table.ForeignKey(
                        name: "FK_Tbl_Comments_Tbl_Profiles_Co_OwnerPr_Id",
                        column: x => x.Co_OwnerPr_Id,
                        principalTable: "Tbl_Profiles",
                        principalColumn: "Pr_Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Tbl_PostLikes",
                columns: table => new
                {
                    Po_Id = table.Column<int>(type: "int", nullable: false),
                    Pr_Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tbl_PostLikes", x => new { x.Po_Id, x.Pr_Id });
                    table.ForeignKey(
                        name: "FK_Tbl_PostLikes_Tbl_Posts_Po_Id",
                        column: x => x.Po_Id,
                        principalTable: "Tbl_Posts",
                        principalColumn: "Po_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tbl_PostLikes_Tbl_Profiles_Pr_Id",
                        column: x => x.Pr_Id,
                        principalTable: "Tbl_Profiles",
                        principalColumn: "Pr_Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Tbl_CommentLikes",
                columns: table => new
                {
                    Co_Id = table.Column<int>(type: "int", nullable: false),
                    Pr_Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tbl_CommentLikes", x => new { x.Co_Id, x.Pr_Id });
                    table.ForeignKey(
                        name: "FK_Tbl_CommentLikes_Tbl_Comments_Co_Id",
                        column: x => x.Co_Id,
                        principalTable: "Tbl_Comments",
                        principalColumn: "Co_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tbl_CommentLikes_Tbl_Profiles_Pr_Id",
                        column: x => x.Pr_Id,
                        principalTable: "Tbl_Profiles",
                        principalColumn: "Pr_Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Tbl_CommentLikes_Pr_Id",
                table: "Tbl_CommentLikes",
                column: "Pr_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tbl_Comments_Co_OwnerPr_Id",
                table: "Tbl_Comments",
                column: "Co_OwnerPr_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tbl_Comments_PostModelPo_Id",
                table: "Tbl_Comments",
                column: "PostModelPo_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tbl_PostLikes_Pr_Id",
                table: "Tbl_PostLikes",
                column: "Pr_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tbl_Posts_Po_OwnerPr_Id",
                table: "Tbl_Posts",
                column: "Po_OwnerPr_Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tbl_CommentLikes");

            migrationBuilder.DropTable(
                name: "Tbl_PostLikes");

            migrationBuilder.DropTable(
                name: "Tbl_Comments");

            migrationBuilder.DropTable(
                name: "Tbl_Posts");
        }
    }
}
