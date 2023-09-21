#!/usr/bin/env python3
"""Obfuscates specified fields in a log message using regular expressions"""


import re
from typing import List
import logging


def filter_datum(
  fields: List[str], redaction: str, message: str, separator: str) -> str:
    """Args: fields, redaction, message, spartor
Returns: str: the obfuscated log message"""
    return re.sub(
      fr'({"|".join(fields)})=[^\\{separator}]*',
      fr'\1={redaction}', message)


class RedactingFormatter(logging.Formatter):
    """ Redacting Formatter class
        """

    REDACTION = "***"
    FORMAT = "[HOLBERTON] %(name)s %(levelname)s %(asctime)-15s: %(message)s"
    SEPARATOR = ";"

    def __init__(self, fields: List[str]):
        super(RedactingFormatter, self).__init__(self.FORMAT)

    def format(self, record: logging.LogRecord) -> str:
        message = super().format(record)
        return filter_datum(self.fields, self.REDACTION, message,
                            self.SEPARATOR)
