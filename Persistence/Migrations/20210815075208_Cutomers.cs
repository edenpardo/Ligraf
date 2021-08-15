using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class Cutomers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Company = table.Column<string>(type: "TEXT", nullable: true),
                    MainEmail = table.Column<string>(type: "TEXT", nullable: true),
                    MainPhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    Address = table.Column<string>(type: "TEXT", nullable: true),
                    HP = table.Column<string>(type: "TEXT", nullable: true),
                    CustomerName = table.Column<string>(type: "TEXT", nullable: true),
                    CustomerRank = table.Column<string>(type: "TEXT", nullable: true),
                    BookkeepingName = table.Column<string>(type: "TEXT", nullable: true),
                    BookkeepingEmail = table.Column<string>(type: "TEXT", nullable: true),
                    BookkeepingPhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    MoreInfo = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Customers");
        }
    }
}
