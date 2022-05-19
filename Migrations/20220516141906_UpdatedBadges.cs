using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AFI_Project.Migrations
{
    public partial class UpdatedBadges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ba_DateRecieved",
                table: "Tbl_Badges");

            migrationBuilder.AddColumn<DateTime>(
                name: "Pr_Ba_DateRecieved",
                table: "Tbl_ProfileBadges",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Pr_Ba_DateRecieved",
                table: "Tbl_ProfileBadges");

            migrationBuilder.AddColumn<DateTime>(
                name: "Ba_DateRecieved",
                table: "Tbl_Badges",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
