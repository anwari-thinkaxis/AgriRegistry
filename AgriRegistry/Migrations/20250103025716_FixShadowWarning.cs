using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgriRegistry.Migrations
{
    /// <inheritdoc />
    public partial class FixShadowWarning : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReportEntries_Reports_ReportId1",
                schema: "dbo",
                table: "ReportEntries");

            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Farms_FarmId1",
                schema: "dbo",
                table: "Reports");

            migrationBuilder.DropIndex(
                name: "IX_Reports_FarmId1",
                schema: "dbo",
                table: "Reports");

            migrationBuilder.DropIndex(
                name: "IX_ReportEntries_ReportId1",
                schema: "dbo",
                table: "ReportEntries");

            migrationBuilder.DropColumn(
                name: "FarmId1",
                schema: "dbo",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "ReportId1",
                schema: "dbo",
                table: "ReportEntries");

            migrationBuilder.RenameColumn(
                name: "quantity",
                schema: "dbo",
                table: "ReportEntries",
                newName: "Quantity");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Quantity",
                schema: "dbo",
                table: "ReportEntries",
                newName: "quantity");

            migrationBuilder.AddColumn<int>(
                name: "FarmId1",
                schema: "dbo",
                table: "Reports",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReportId1",
                schema: "dbo",
                table: "ReportEntries",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reports_FarmId1",
                schema: "dbo",
                table: "Reports",
                column: "FarmId1");

            migrationBuilder.CreateIndex(
                name: "IX_ReportEntries_ReportId1",
                schema: "dbo",
                table: "ReportEntries",
                column: "ReportId1");

            migrationBuilder.AddForeignKey(
                name: "FK_ReportEntries_Reports_ReportId1",
                schema: "dbo",
                table: "ReportEntries",
                column: "ReportId1",
                principalSchema: "dbo",
                principalTable: "Reports",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Farms_FarmId1",
                schema: "dbo",
                table: "Reports",
                column: "FarmId1",
                principalSchema: "dbo",
                principalTable: "Farms",
                principalColumn: "Id");
        }
    }
}
