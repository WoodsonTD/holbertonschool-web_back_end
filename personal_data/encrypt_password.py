#!/usr/bin/env python3
"""This code defines a hash_password function that securely hashes
a user's password using the bcrypt package. Here's a brief
explanation of what the code does"""


import bcrypt


def hash_password(password: str) -> bytes:
    """generate a salt for hashing
    has the password using the generated salt"""
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hash_password



def is_valid(hashed_password: bytes, password: str) -> bool:
    """returns a boolean"""
    if bcrypt.checkpw(password.encode('utf-8'), hashed_password):
        return True
    else:
        return False
