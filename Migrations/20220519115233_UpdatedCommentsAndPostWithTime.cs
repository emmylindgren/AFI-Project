using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AFI_Project.Migrations
{
    public partial class UpdatedCommentsAndPostWithTime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Po_Date",
                table: "Tbl_Posts",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Co_Date",
                table: "Tbl_Comments",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Po_Date",
                table: "Tbl_Posts");

            migrationBuilder.DropColumn(
                name: "Co_Date",
                table: "Tbl_Comments");
        }
    }
}
