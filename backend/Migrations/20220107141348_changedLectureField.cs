using Microsoft.EntityFrameworkCore.Migrations;

namespace ReactStudentManagementSystem.Migrations
{
    public partial class changedLectureField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_lectures_teachers_lecturerId",
                table: "lectures");

            migrationBuilder.RenameColumn(
                name: "lecturerId",
                table: "lectures",
                newName: "lecturer_id");

            migrationBuilder.RenameIndex(
                name: "IX_lectures_lecturerId",
                table: "lectures",
                newName: "IX_lectures_lecturer_id");

            migrationBuilder.AddForeignKey(
                name: "FK_lectures_teachers_lecturer_id",
                table: "lectures",
                column: "lecturer_id",
                principalTable: "teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_lectures_teachers_lecturer_id",
                table: "lectures");

            migrationBuilder.RenameColumn(
                name: "lecturer_id",
                table: "lectures",
                newName: "lecturerId");

            migrationBuilder.RenameIndex(
                name: "IX_lectures_lecturer_id",
                table: "lectures",
                newName: "IX_lectures_lecturerId");

            migrationBuilder.AddForeignKey(
                name: "FK_lectures_teachers_lecturerId",
                table: "lectures",
                column: "lecturerId",
                principalTable: "teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
