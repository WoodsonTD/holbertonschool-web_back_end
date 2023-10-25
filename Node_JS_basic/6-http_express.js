const express = require('express');

// Create an Express application
const app = express();

// Define a route for the root endpoint that displays "Hello Holberton School!"
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Define a 404 error handler for all other routes
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <title>Error</title>
    </head>
    <body>
    <pre>Cannot GET ${req.originalUrl}</pre>
    </body>
    </html>
  `);
});

// Start the server and listen on port 1245
app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

// Export the Express app
module.exports = app;
