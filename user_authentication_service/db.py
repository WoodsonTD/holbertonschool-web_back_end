#!/usr/bin/env python3
"""DB module
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.session import Session
from sqlalchemy.exc import InvalidRequestError
from sqlalchemy.orm.exc import NoResultFound
from user import Base, User


class DB:
    """DB class
    """

    def __init__(self) -> None:
        """Initialize a new DB instance
        """
        self._engine = create_engine("sqlite:///a.db", echo=False)
        Base.metadata.drop_all(self._engine)
        Base.metadata.create_all(self._engine)
        self.__session = None

    @property
    def _session(self) -> Session:
        """Memorized session object
        """
        if self.__session is None:
            DBSession = sessionmaker(bind=self._engine)
            self.__session = DBSession()
        return self.__session

    def add_user(self, email: str, hashed_password: str) -> User:
        """saves a new user to the database
        """
        new_user = User(email=email, hashed_password=hashed_password)
        self._session.add(new_user)
        self._session.commit()
        return new_user

    def find_user_by(self, **kwargs) -> User:
        """returns the first row found in the users table
        filtered by the methods input arguments
        """
        if not kwargs:
            raise InvalidRequestError
        if any(key not in User.__table__.columns for key in kwargs):
            raise InvalidRequestError
        user = self._session.query(User).filter_by(**kwargs).one()
        if user is None:
            raise NoResultFound
        return user

    def update_user(self, user_id: int, **kwargs) -> None:
        """takes an argument a required user_id integer
        and arbitrary keyword arguments, and returns None
        """
        user = self.find_user_by(id=user_id)
        for key, value in kwargs.items():
            if key not in User.__table__.columns:
                raise ValueError
            setattr(user, key, value)
        self._session.commit()
