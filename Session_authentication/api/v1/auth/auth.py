#!/usr/bin/env python3
"""create a class to manage the API authentication"""
from typing import List, TypeVar
from flask import request

User = TypeVar('User')


class Auth:
    """Auth class"""

    def require_auth(self, path: str, excluded_paths: List[str]) -> bool:
        """Returns False if the path is in excluded_paths"""
        if path is None or excluded_paths is None or not excluded_paths:
            return True

        path = path if path[-1] == '/' else f'{path}/'

        return path not in excluded_paths

    def authorization_header(self, request=None) -> str:
        """ Method that returns None - request """
        if request is None or 'Authorization' not in request.headers:
            return None
        return request.headers['Authorization']

    def current_user(self, request=None) -> User:
        """ Returns None - request will not be used. """
        return None
