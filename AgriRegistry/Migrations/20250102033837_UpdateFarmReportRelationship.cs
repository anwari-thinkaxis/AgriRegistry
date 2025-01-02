using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgriRegistry.Migrations
{
    /// <inheritdoc />
    public partial class UpdateFarmReportRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Report_Farms_FarmId",
                schema: "dbo",
                table: "Report");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Report",
                schema: "dbo",
                table: "Report");

            migrationBuilder.RenameTable(
                name: "Report",
                schema: "dbo",
                newName: "Reports",
                newSchema: "dbo");

            migrationBuilder.RenameIndex(
                name: "IX_Report_FarmId",
                schema: "dbo",
                table: "Reports",
                newName: "IX_Reports_FarmId");

            migrationBuilder.AddColumn<int>(
                name: "FarmId1",
                schema: "dbo",
                table: "Reports",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Reports",
                schema: "dbo",
                table: "Reports",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_FarmId1",
                schema: "dbo",
                table: "Reports",
                column: "FarmId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Farms_FarmId",
                schema: "dbo",
                table: "Reports",
                column: "FarmId",
                principalSchema: "dbo",
                principalTable: "Farms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Farms_FarmId1",
                schema: "dbo",
                table: "Reports",
                column: "FarmId1",
                principalSchema: "dbo",
                principalTable: "Farms",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Farms_FarmId",
                schema: "dbo",
                table: "Reports");

            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Farms_FarmId1",
                schema: "dbo",
                table: "Reports");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Reports",
                schema: "dbo",
                table: "Reports");

            migrationBuilder.DropIndex(
                name: "IX_Reports_FarmId1",
                schema: "dbo",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "FarmId1",
                schema: "dbo",
                table: "Reports");

            migrationBuilder.RenameTable(
                name: "Reports",
                schema: "dbo",
                newName: "Report",
                newSchema: "dbo");

            migrationBuilder.RenameIndex(
                name: "IX_Reports_FarmId",
                schema: "dbo",
                table: "Report",
                newName: "IX_Report_FarmId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Report",
                schema: "dbo",
                table: "Report",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Report_Farms_FarmId",
                schema: "dbo",
                table: "Report",
                column: "FarmId",
                principalSchema: "dbo",
                principalTable: "Farms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
