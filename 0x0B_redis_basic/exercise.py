#!/usr/bin/env python3
"""Redis basic"""
import redis
import uuid
from typing import Union, Callable

class Cache:
    def __init__(self):
        self._redis = redis.Redis()
        self._redis.flushdb()

    """takes data arguments and returns a string"""
    def store(self, data: Union[str, bytes, int, float]) -> str:
        key = str(uuid.uuid4())
        self._redis.set(key, data)
        return key
    
    """convert data back to desired format"""
    def get(self, key: str, fn: Callable = None) -> Union[str, bytes, int, float]:
        value = self._redis.get(key)
        if fn is not None:
            return fn(value)
        return value
    
    """parametrize cache.get with correct conversion function"""
    def get_str(self, key: str) -> str:
        return self.get(key, fn=lambda data: data.decode("utf-8"))

    def get_int(self, key: str) -> int:
        return self.get(key, fn=int)
