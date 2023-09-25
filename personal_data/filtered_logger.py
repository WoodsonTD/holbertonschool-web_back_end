#!/usr/bin/env python3
"""Connect to secure database and log sensitive user data"""
from typing import List
import logging
import re
import os
import mysql.connector


PII_FIELDS = ("name", "email", "phone", "ssn", "password")


def filter_datum(fields: List[str], redaction: str,
                 message: str, separator: str) -> str:
    """Obfuscates specified fields in a log message.

    Args:
        fields (List[str]): List of fields to obfuscate.
        redaction (str): Redaction string to replace sensitive information.
        message (str): The log message to process.
        separator (str): The character separating fields in the log message.

    Returns:
        str: The obfuscated log message"""
    for field in fields:
        message = re.sub(f"{field}=.*?{separator}",
                         f"{field}={redaction}{separator}", message)
    return message


class RedactingFormatter(logging.Formatter):
    """ Custom log formatter that redacts sensitive data.

    Attributes:
        REDACTION (str): The redaction string used to replace sensitive
        information.
        FORMAT (str): The log message format.
        SEPARATOR (str): The character separating fields in the log message."""

    REDACTION = "***"
    FORMAT = "[HOLBERTON] %(name)s %(levelname)s %(asctime)-15s: %(message)s"
    SEPARATOR = ";"

    def __init__(self, fields: List[str]):
        """Initializes a RedactingFormatter object.

        Args:
            fields (List[str]): List of fields to redact."""
        super(RedactingFormatter, self).__init__(self.FORMAT)
        self.fields = fields

    def format(self, record: logging.LogRecord) -> str:
        """Formats log records and redacts specified fields.

        Args:
            record (logging.LogRecord): The log record to format.

        Returns:
            str: The formatted log message with redacted sensitive data."""
        original_message = record.getMessage()
        redacted_message = filter_datum(
            self.fields,
            self.REDACTION,
            original_message,
            self.SEPARATOR)
        record.msg = redacted_message
        return super().format(record)


def get_logger() -> logging.Logger:
    """   Returns a configured logging.Logger object.

    Returns:
        logging.Logger: A logger object for recording log messages."""
    logger = logging.getLogger("user_data")
    logger.setLevel(logging.INFO)
    logger.propagate = False
    handler = logging.StreamHandler()
    formatter = RedactingFormatter(list(PII_FIELDS))
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    return logger


def get_db() -> mysql.connector.connection.MySQLConnection:
    """Connects to a MySQL database and returns a connection object.

    Returns:
        mysql.connector.connection.MySQLConnection:
        A connection to the database."""

    return mysql.connector.connect(
        user=os.getenv('PERSONAL_DATA_DB_USERNAME', 'root'),
        password=os.getenv('PERSONAL_DATA_DB_PASSWORD', ''),
        host=os.getenv('PERSONAL_DATA_DB_HOST', 'localhost'),
        database=os.getenv('PERSONAL_DATA_DB_NAME')
    )


def main():
    """Reads user data from a secure database and logs it with sensitive
    information redacted."""
    logger = get_logger()

    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT * FROM users;")  # Select all rows
    rows = cursor.fetchall()  # Fetch all rows
    for row in rows:
        row_dict = {
            'name': row[0],
            'email': row[1],
            'phone': row[2],
            'ssn': row[3],
            'password': row[4],
            'ip': row[5],
            'last_login': row[6],
            'user_agent': row[7]
        }

        message = "; ".join([f"{key}={value}"
                             for key, value in row_dict.items()])
        logger.info(message)
        # Logger will use RedactingFormatter to redact sensitive fields

    cursor.close()
    db.close()


if __name__ == "__main__":
    main()
