export default function updateStudentGradeByCity(students, city, newGrades) {
  const studentsByCity = students.filter((item) => item.location === city);
  const studentsById = studentsByCity.map((item) => item.id);
  const studentsWithGrades = studentsById.map((id) => {
    const student = students.find((item) => item.id === id);
    const grade = newGrades.find((item) => item.studentId === id);
    return { ...student, grade: grade ? grade.grade : 'N/A' };
  });
  return studentsWithGrades;
}
