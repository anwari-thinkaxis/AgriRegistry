using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgriRegistry.Migrations
{
    /// <inheritdoc />
    public partial class AddProduceOwner : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                schema: "dbo",
                table: "Produces",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FarmManagerId",
                schema: "dbo",
                table: "Produces",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Produces_FarmManagerId_FullName",
                schema: "dbo",
                table: "Produces",
                columns: new[] { "FarmManagerId", "FullName" },
                unique: true,
                filter: "[FarmManagerId] IS NOT NULL AND [FullName] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Produces_AspNetUsers_FarmManagerId",
                schema: "dbo",
                table: "Produces",
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
                name: "FK_Produces_AspNetUsers_FarmManagerId",
                schema: "dbo",
                table: "Produces");

            migrationBuilder.DropIndex(
                name: "IX_Produces_FarmManagerId_FullName",
                schema: "dbo",
                table: "Produces");

            migrationBuilder.DropColumn(
                name: "FarmManagerId",
                schema: "dbo",
                table: "Produces");

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                schema: "dbo",
                table: "Produces",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);
        }
    }
}
