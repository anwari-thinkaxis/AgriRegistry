using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgriRegistry.Migrations
{
    /// <inheritdoc />
    public partial class AddFarmManagerRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FarmManagerId",
                schema: "dbo",
                table: "Farms",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Farms_FarmManagerId",
                schema: "dbo",
                table: "Farms",
                column: "FarmManagerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Farms_AspNetUsers_FarmManagerId",
                schema: "dbo",
                table: "Farms",
                column: "FarmManagerId",
                principalSchema: "dbo",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Farms_AspNetUsers_FarmManagerId",
                schema: "dbo",
                table: "Farms");

            migrationBuilder.DropIndex(
                name: "IX_Farms_FarmManagerId",
                schema: "dbo",
                table: "Farms");

            migrationBuilder.DropColumn(
                name: "FarmManagerId",
                schema: "dbo",
                table: "Farms");
        }
    }
}
