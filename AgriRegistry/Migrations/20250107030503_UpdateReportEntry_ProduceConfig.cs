using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgriRegistry.Migrations
{
    /// <inheritdoc />
    public partial class UpdateReportEntry_ProduceConfig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ReportEntries_ProduceId",
                schema: "dbo",
                table: "ReportEntries");

            migrationBuilder.CreateIndex(
                name: "IX_ReportEntries_ProduceId",
                schema: "dbo",
                table: "ReportEntries",
                column: "ProduceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ReportEntries_ProduceId",
                schema: "dbo",
                table: "ReportEntries");

            migrationBuilder.CreateIndex(
                name: "IX_ReportEntries_ProduceId",
                schema: "dbo",
                table: "ReportEntries",
                column: "ProduceId",
                unique: true);
        }
    }
}
