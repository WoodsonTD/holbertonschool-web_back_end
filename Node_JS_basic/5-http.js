const http = require('http');
const fs = require('fs');
const csvParser = require('csv-parser');
const url = require('url');

// Create an HTTP server
const app = http.createServer((req, res) => {
  // Parse the URL to get the pathname
  const { pathname } = url.parse(req.url);

  // Set the response headers for plain text
  res.setHeader('Content-Type', 'text/plain');

  // Check the pathname and respond accordingly
  if (pathname === '/') {
    res.end('Hello Holberton School!');
  } else if (pathname === '/students') {
    const databaseFile = process.argv[2]; // Get the database file from the command line arguments

    // Check if the database file is provided as an argument
    if (!databaseFile) {
      res.statusCode = 500;
      res.end('Database file not provided.');
      return;
    }

    const students = [];

    fs.createReadStream(databaseFile)
      .pipe(csvParser())
      .on('data', (row) => {
        if (row && row.Student && row.Fieled) {
          students.push(row.Student);
        }
      })
      .on('end', () => {
        const response = `
          This is the list of our students
          Number of students: ${students.length}
          List: ${students.join(', ')}
        `;
        res.end(response);
      });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

module.exports = app;

