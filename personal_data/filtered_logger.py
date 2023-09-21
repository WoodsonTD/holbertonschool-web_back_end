#!/usr/bin/env python3
"""Obfuscates specified fields in a log message using regular expressions"""


import re


def filter_datum(fields, redaction, message, separator):
    return re.sub(fr'({"|".join(fields)})=[^\\{separator}]*',
                fr'\1={redaction}', message)
