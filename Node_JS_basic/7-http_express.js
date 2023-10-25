const express = require('express');
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');

// Create an Express application
const app = express();

// Define a route for the root endpoint that displays "Hello Holberton School!"
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Define a route for the /students endpoint
app.get('/students', (req, res) => {
  const databaseFile = process.argv[2]; // Get the database file from the command line arguments

  // Check if the database file is provided as an argument
  if (!databaseFile) {
    res.status(500).send('Database file not provided.');
    return;
  }

  // Read the CSV file and process the data
  const students = [];
  fs.createReadStream(databaseFile)
    .pipe(csvParser())
    .on('data', (row) => {
      if (row && row.Student && row.Filed) {
        students.push(row.Student);
      }
    })
    .on('end', () => {
      const response = `
        This is the list of our students
        Number of students: ${students.length}
        List: ${students.join(', ')}
      `;
      res.type('text').send(response);
    });
});

// Start the server and listen on port 1245
const server = app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

// Export the Express app
module.exports = app;

