using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgriRegistry.Migrations
{
    /// <inheritdoc />
    public partial class MakeFarmManagerIdRequired : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Produces_FarmManagerId_FullName",
                schema: "dbo",
                table: "Produces");

            migrationBuilder.AlterColumn<string>(
                name: "FarmManagerId",
                schema: "dbo",
                table: "Produces",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Produces_FarmManagerId_FullName",
                schema: "dbo",
                table: "Produces",
                columns: new[] { "FarmManagerId", "FullName" },
                unique: true,
                filter: "[FullName] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Produces_FarmManagerId_FullName",
                schema: "dbo",
                table: "Produces");

            migrationBuilder.AlterColumn<string>(
                name: "FarmManagerId",
                schema: "dbo",
                table: "Produces",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.CreateIndex(
                name: "IX_Produces_FarmManagerId_FullName",
                schema: "dbo",
                table: "Produces",
                columns: new[] { "FarmManagerId", "FullName" },
                unique: true,
                filter: "[FarmManagerId] IS NOT NULL AND [FullName] IS NOT NULL");
        }
    }
}
