using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class PVCtaskss : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Corners",
                table: "JobTasks");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "JobTasks");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "JobTasks");

            migrationBuilder.DropColumn(
                name: "LengthSize",
                table: "JobTasks");

            migrationBuilder.DropColumn(
                name: "MoreInfo",
                table: "JobTasks");

            migrationBuilder.DropColumn(
                name: "PrintType",
                table: "JobTasks");

            migrationBuilder.DropColumn(
                name: "WidthSize",
                table: "JobTasks");

            migrationBuilder.CreateTable(
                name: "PVCTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    WidthSize = table.Column<double>(type: "REAL", nullable: false),
                    LengthSize = table.Column<double>(type: "REAL", nullable: false),
                    PrintType = table.Column<string>(type: "TEXT", nullable: true),
                    Corners = table.Column<string>(type: "TEXT", nullable: true),
                    Image = table.Column<string>(type: "TEXT", nullable: true),
                    MoreInfo = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PVCTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PVCTasks_JobTasks_Id",
                        column: x => x.Id,
                        principalTable: "JobTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PVCTasks");

            migrationBuilder.AddColumn<string>(
                name: "Corners",
                table: "JobTasks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "JobTasks",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "JobTasks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "LengthSize",
                table: "JobTasks",
                type: "REAL",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MoreInfo",
                table: "JobTasks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PrintType",
                table: "JobTasks",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "WidthSize",
                table: "JobTasks",
                type: "REAL",
                nullable: true);
        }
    }
}
