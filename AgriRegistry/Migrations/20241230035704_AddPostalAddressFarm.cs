using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgriRegistry.Migrations
{
    /// <inheritdoc />
    public partial class AddPostalAddressFarm : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PostalAddress",
                schema: "dbo",
                table: "Farms",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PostalAddress",
                schema: "dbo",
                table: "Farms");
        }
    }
}
