const express = require('express');
const fs = require('fs');
const csvParser = require('csv-parser');

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const databaseFile = process.argv[2]; // Get the database file from the command line arguments

  // Check if the database file is provided as an argument
  if (!databaseFile) {
    res.status(500).send('Database file not provided.');
    return;
  }

  const students = [];

  fs.createReadStream(databaseFile)
    .pipe(csvParser())
    .on('data', (row) => {
      if (row && row.Student && row.Field) {
        students.push(row.Student);
      }
    })
    .on('end', () => {
      const response = `
        This is the list of our students
        Number of students: ${students.length}
        List: ${students.join(', ')}
      `;
      res.send(response);
    });
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
