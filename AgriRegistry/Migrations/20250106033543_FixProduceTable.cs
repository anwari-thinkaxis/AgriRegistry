using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgriRegistry.Migrations
{
    /// <inheritdoc />
    public partial class FixProduceTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produces_ReportEntries_ReportEntryId",
                schema: "dbo",
                table: "Produces");

            migrationBuilder.DropIndex(
                name: "IX_Produces_ReportEntryId",
                schema: "dbo",
                table: "Produces");

            migrationBuilder.DropColumn(
                name: "ReportEntryId",
                schema: "dbo",
                table: "Produces");

            migrationBuilder.AddColumn<int>(
                name: "ProduceId",
                schema: "dbo",
                table: "ReportEntries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ReportEntries_ProduceId",
                schema: "dbo",
                table: "ReportEntries",
                column: "ProduceId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ReportEntries_Produces_ProduceId",
                schema: "dbo",
                table: "ReportEntries",
                column: "ProduceId",
                principalSchema: "dbo",
                principalTable: "Produces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReportEntries_Produces_ProduceId",
                schema: "dbo",
                table: "ReportEntries");

            migrationBuilder.DropIndex(
                name: "IX_ReportEntries_ProduceId",
                schema: "dbo",
                table: "ReportEntries");

            migrationBuilder.DropColumn(
                name: "ProduceId",
                schema: "dbo",
                table: "ReportEntries");

            migrationBuilder.AddColumn<int>(
                name: "ReportEntryId",
                schema: "dbo",
                table: "Produces",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Produces_ReportEntryId",
                schema: "dbo",
                table: "Produces",
                column: "ReportEntryId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Produces_ReportEntries_ReportEntryId",
                schema: "dbo",
                table: "Produces",
                column: "ReportEntryId",
                principalSchema: "dbo",
                principalTable: "ReportEntries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
