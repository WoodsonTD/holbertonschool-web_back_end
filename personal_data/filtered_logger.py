#!/usr/bin/env python3
"""Obfuscates specified fields in a log message using regular expressions"""


import re
from typing import List


def filter_datum(
  fields: List[str], redaction: str, message: str, separator: str) -> str:
    """Args: fields, redaction, message, spartor
Returns: str: the obfuscated log message"""
    return re.sub(
      fr'({"|".join(fields)})=[^\\{separator}]*',
      fr'\1={redaction}', message)
