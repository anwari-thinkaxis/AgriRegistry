using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgriRegistry.Migrations
{
    /// <inheritdoc />
    public partial class NewLocationFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                schema: "dbo",
                table: "Locations",
                newName: "Kampong");

            migrationBuilder.AddColumn<string>(
                name: "District",
                schema: "dbo",
                table: "Locations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FullAddress",
                schema: "dbo",
                table: "Locations",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "District",
                schema: "dbo",
                table: "Locations");

            migrationBuilder.DropColumn(
                name: "FullAddress",
                schema: "dbo",
                table: "Locations");

            migrationBuilder.RenameColumn(
                name: "Kampong",
                schema: "dbo",
                table: "Locations",
                newName: "Name");
        }
    }
}
