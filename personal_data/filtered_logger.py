#!/usr/bin/env python3
"""Obfuscates specified fields in a log message using regular expressions"""


import re
from typing import List


def filter_datum(fields: List[str], redaction: str, message: str, separator: str) -> str:
    return re.sub(fr'({"|".join(fields)})=[^\\{separator}]*',
                fr'\1={redaction}', message)
