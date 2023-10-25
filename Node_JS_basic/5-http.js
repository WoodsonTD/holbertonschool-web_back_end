// Create a more complex HTTP server using Node's HTTP module

const http = require('http');
const countStudents = require('./3-read_file_async');

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.end('This is the list of our students');
    try {
      await countStudents('./test/database.csv');
    } catch (error) {
      res.write(error.message);
    }
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});
app.listen(1245);

module.exports = app;
