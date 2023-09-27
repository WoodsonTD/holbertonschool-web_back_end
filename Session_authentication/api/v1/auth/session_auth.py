#!/usr/bin/env python3
"""Session Authentication"""
from api.v1.auth.auth import Auth


class SessionAuth(Auth):
    """SessionAuth class"""
    user_id_by_session_id = {}

    def create_session(self, user_id: str = None) -> str:
        """Creates a session ID for a user_id"""
        from uuid import uuid4
        if user_id is None or type(user_id) is not str:
            return None
        session_id = str(uuid4())
        SessionAuth.user_id_by_session_id[session_id] = user_id
        return session_id

    def user_id_for_session_id(self, session_id: str = None) -> str:
        """Returns a User ID based on a sessin ID"""
        if session_id is None or type(session_id) is not str:
            return None
        return SessionAuth.user_id_by_session_id.get(session_id)

    def current_user(self, request=None):
        """Return a User instance based on a cookie value"""
        # Get the session cookie from the request
        session_id = self.session_cookie(request)
        # Get the user ID from the session ID
        user_id = self.user_id_for_session_id(session_id)
        # Retrieve and return the user instance from the database
        from models.user import User
        return User.get(user_id)

    def destroy_session(self, request=None):
        """Deletes the user session-logout"""
        if request is None:
            return False
        session_id = self.session_cookie(request)
        if not session_id:
            return False
        user_id = self.user_id_for_session_id(session_id)
        if not user_id:
            return False
        del SessionAuth.user_id_by_session_id[session_id]
        return True
