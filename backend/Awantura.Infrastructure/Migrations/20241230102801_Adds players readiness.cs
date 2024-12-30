using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Awantura.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Addsplayersreadiness : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isBluePlayerReady",
                table: "GameParticipants",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isGreenPlayerReady",
                table: "GameParticipants",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isYellowPlayerReady",
                table: "GameParticipants",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isBluePlayerReady",
                table: "GameParticipants");

            migrationBuilder.DropColumn(
                name: "isGreenPlayerReady",
                table: "GameParticipants");

            migrationBuilder.DropColumn(
                name: "isYellowPlayerReady",
                table: "GameParticipants");
        }
    }
}
