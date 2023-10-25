const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const port = 1245;
const databaseFile = process.argv[2];

function readStudentsData(databaseFile) {
  return new Promise((resolve, reject) => {
    const students = { CS: [], SWE: [] };

    if (!databaseFile) {
      reject(new Error('Database file not provided.'));
      return;
    }

    fs.createReadStream(databaseFile)
      .pipe(csv())
      .on('data', (row) => {
        if (row && row.Student && row.Field) {
          if (row.Field === 'CS') {
            students.CS.push(row.Student);
          } else if (row.Field === 'SWE') {
            students.SWE.push(row.Student);
          }
        }
      })
      .on('end', () => {
        const response = `
          This is the list of our students
          Number of students: ${students.CS.length + students.SWE.length}
          Number of students in CS: ${students.CS.length}. List: ${students.CS.join(', ')}
          Number of students in SWE: ${students.SWE.length}. List: ${students.SWE.join(', ')}
        `;
        resolve(response);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const studentsData = await readStudentsData(databaseFile);
    res.send(studentsData);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
