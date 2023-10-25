const http = require('http');
const fs = require('fs');
const csvParser = require('csv-parser');

const app = http.createServer((req, res) => {
  const { url } = req;
  res.setHeader('Content-Type', 'text/plain');

  if (url === '/') {
    res.end('Hello Holberton School!');
  } else if (url === '/students') {
    const databaseFile = process.argv[2];

    if (!databaseFile) {
      res.statusCode = 500;
      res.end('Database file not provided.');
      return;
    }

    const students = [];

    fs.createReadStream(databaseFile)
      .pipe(csvParser())
      .on('data', (row) => {
        if (row && row.field === 'CS') {
          students.push(row.firstname);
        }
      })
      .on('end', () => {
        const response = `
          This is the list of our CS students
          Number of CS students: ${students.length}
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
