-- script that creates a table (users)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT
);
