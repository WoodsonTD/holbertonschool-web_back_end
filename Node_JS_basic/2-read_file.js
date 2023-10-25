// Using the database database.csv
// create a function countStudents in the file 2-read_file.js

const fs = require('fs');

function countStudents(path) {
  if (!fs.existsSync(path)) {
    throw new Error('Cannot load the database');
  }

  // Read the file synchronously, and gets content as a string
  const data = fs.readFileSync(path, 'utf8');
  // Split the string into an array of lines
  const lines = data.trim().split('\n');
  // Remove the first line (header)
  const header = lines.slice(1);

  // Count the number of students by field
  let totalStudents = 0;
  const studentsByField = {};

  for (const student of header) {
    const fields = student.split(',');
    // Checks the line has the right number of fields
    if (fields.length === 4) {
      const field = fields[3];
      totalStudents += 1;
      if (!studentsByField[field]) {
        studentsByField[field] = [];
      }
      studentsByField[field].push(fields[0]);
    }
  }

  console.log(`Number of students: ${totalStudents}`);
  for (const field in studentsByField) {
    if (Object.prototype.hasOwnProperty.call(studentsByField, field)) {
      const list = studentsByField[field];
      const count = list.length;
      const names = list.join(', ');
      console.log(`Number of students in ${field}: ${count}. List: ${names}`);
    }
  }
}

module.exports = countStudents;
