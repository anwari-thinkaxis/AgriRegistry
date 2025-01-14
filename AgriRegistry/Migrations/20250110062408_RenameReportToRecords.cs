using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgriRegistry.Migrations
{
    /// <inheritdoc />
    public partial class RenameReportToRecords : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReportEntries",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Reports",
                schema: "dbo");

            migrationBuilder.CreateTable(
                name: "Records",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FarmId = table.Column<int>(type: "int", nullable: false),
                    DateSubmitted = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Records", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Records_Farms_FarmId",
                        column: x => x.FarmId,
                        principalSchema: "dbo",
                        principalTable: "Farms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RecordEntries",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProduceId = table.Column<int>(type: "int", nullable: false),
                    RecordId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecordEntries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecordEntries_Produces_ProduceId",
                        column: x => x.ProduceId,
                        principalSchema: "dbo",
                        principalTable: "Produces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RecordEntries_Records_RecordId",
                        column: x => x.RecordId,
                        principalSchema: "dbo",
                        principalTable: "Records",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RecordEntries_ProduceId",
                schema: "dbo",
                table: "RecordEntries",
                column: "ProduceId");

            migrationBuilder.CreateIndex(
                name: "IX_RecordEntries_RecordId",
                schema: "dbo",
                table: "RecordEntries",
                column: "RecordId");

            migrationBuilder.CreateIndex(
                name: "IX_Records_FarmId",
                schema: "dbo",
                table: "Records",
                column: "FarmId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RecordEntries",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Records",
                schema: "dbo");

            migrationBuilder.CreateTable(
                name: "Reports",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FarmId = table.Column<int>(type: "int", nullable: false),
                    DateSubmitted = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reports_Farms_FarmId",
                        column: x => x.FarmId,
                        principalSchema: "dbo",
                        principalTable: "Farms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ReportEntries",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProduceId = table.Column<int>(type: "int", nullable: false),
                    ReportId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportEntries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReportEntries_Produces_ProduceId",
                        column: x => x.ProduceId,
                        principalSchema: "dbo",
                        principalTable: "Produces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ReportEntries_Reports_ReportId",
                        column: x => x.ReportId,
                        principalSchema: "dbo",
                        principalTable: "Reports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReportEntries_ProduceId",
                schema: "dbo",
                table: "ReportEntries",
                column: "ProduceId");

            migrationBuilder.CreateIndex(
                name: "IX_ReportEntries_ReportId",
                schema: "dbo",
                table: "ReportEntries",
                column: "ReportId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_FarmId",
                schema: "dbo",
                table: "Reports",
                column: "FarmId");
        }
    }
}
