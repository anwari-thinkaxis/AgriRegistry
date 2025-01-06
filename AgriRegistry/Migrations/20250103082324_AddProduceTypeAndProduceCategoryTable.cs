using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgriRegistry.Migrations
{
    /// <inheritdoc />
    public partial class AddProduceTypeAndProduceCategoryTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProduceTypeId",
                schema: "dbo",
                table: "Produces",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ProduceCategories",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProduceCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProduceTypes",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProduceCategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProduceTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProduceTypes_ProduceCategories_ProduceCategoryId",
                        column: x => x.ProduceCategoryId,
                        principalSchema: "dbo",
                        principalTable: "ProduceCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Produces_ProduceTypeId",
                schema: "dbo",
                table: "Produces",
                column: "ProduceTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ProduceTypes_ProduceCategoryId",
                schema: "dbo",
                table: "ProduceTypes",
                column: "ProduceCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Produces_ProduceTypes_ProduceTypeId",
                schema: "dbo",
                table: "Produces",
                column: "ProduceTypeId",
                principalSchema: "dbo",
                principalTable: "ProduceTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produces_ProduceTypes_ProduceTypeId",
                schema: "dbo",
                table: "Produces");

            migrationBuilder.DropTable(
                name: "ProduceTypes",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "ProduceCategories",
                schema: "dbo");

            migrationBuilder.DropIndex(
                name: "IX_Produces_ProduceTypeId",
                schema: "dbo",
                table: "Produces");

            migrationBuilder.DropColumn(
                name: "ProduceTypeId",
                schema: "dbo",
                table: "Produces");
        }
    }
}
