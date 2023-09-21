#!/usr/bin/env python3
"""Obfuscates specified fields in a log message using regular expressions"""


import re


def filter_datum(fields, redaction, message, separator):
    regex = re.compile(f"({separator.join(fields)})=([^{separator}]*)")
    return regex.sub(fr"\1={redaction}", message)
