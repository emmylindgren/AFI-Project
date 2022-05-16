using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AFI_Project.Migrations
{
    public partial class CommentsAndPostUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tbl_Comments_Tbl_Posts_PostModelPo_Id",
                table: "Tbl_Comments");

            migrationBuilder.DropIndex(
                name: "IX_Tbl_Comments_PostModelPo_Id",
                table: "Tbl_Comments");

            migrationBuilder.DropColumn(
                name: "PostModelPo_Id",
                table: "Tbl_Comments");

            migrationBuilder.AddColumn<int>(
                name: "Co_PostPo_Id",
                table: "Tbl_Comments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Tbl_Comments_Co_PostPo_Id",
                table: "Tbl_Comments",
                column: "Co_PostPo_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tbl_Comments_Tbl_Posts_Co_PostPo_Id",
                table: "Tbl_Comments",
                column: "Co_PostPo_Id",
                principalTable: "Tbl_Posts",
                principalColumn: "Po_Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tbl_Comments_Tbl_Posts_Co_PostPo_Id",
                table: "Tbl_Comments");

            migrationBuilder.DropIndex(
                name: "IX_Tbl_Comments_Co_PostPo_Id",
                table: "Tbl_Comments");

            migrationBuilder.DropColumn(
                name: "Co_PostPo_Id",
                table: "Tbl_Comments");

            migrationBuilder.AddColumn<int>(
                name: "PostModelPo_Id",
                table: "Tbl_Comments",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tbl_Comments_PostModelPo_Id",
                table: "Tbl_Comments",
                column: "PostModelPo_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tbl_Comments_Tbl_Posts_PostModelPo_Id",
                table: "Tbl_Comments",
                column: "PostModelPo_Id",
                principalTable: "Tbl_Posts",
                principalColumn: "Po_Id");
        }
    }
}
