using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class PVCtaskssCustomerID : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobTasks_Customers_CustomerId",
                table: "JobTasks");

            migrationBuilder.DropIndex(
                name: "IX_JobTasks_CustomerId",
                table: "JobTasks");

            migrationBuilder.AlterColumn<Guid>(
                name: "CustomerId",
                table: "JobTasks",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "CustomerId",
                table: "JobTasks",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.CreateIndex(
                name: "IX_JobTasks_CustomerId",
                table: "JobTasks",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobTasks_Customers_CustomerId",
                table: "JobTasks",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
