using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgriRegistry.Migrations
{
    /// <inheritdoc />
    public partial class AddFarmManagerIdToLocation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FarmManagerId",
                schema: "dbo",
                table: "Locations",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FarmManagerId",
                schema: "dbo",
                table: "Locations");
        }
    }
}
