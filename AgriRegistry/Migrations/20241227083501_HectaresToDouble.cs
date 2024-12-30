using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgriRegistry.Migrations
{
    /// <inheritdoc />
    public partial class HectaresToDouble : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Hectares",
                schema: "dbo",
                table: "Farms",
                type: "float",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Hectares",
                schema: "dbo",
                table: "Farms",
                type: "int",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");
        }
    }
}
