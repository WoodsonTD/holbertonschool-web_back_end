#!/usr/bin/env python3
""" Redis basic Project Tasks: 0-4 """
import redis
import uuid
from typing import Union, Callable, Optional
from functools import wraps


def count_calls(method: Callable) -> Callable:
    """Count the number of times method is calld"""
    @wraps(method)
    def wrapper(self, *args, **kwargs):
        """Wrapper function"""
        self._redis.incr(method.__qualname__)
        return method(self, *args, **kwargs)
    return wrapper


def call_history(method: Callable) -> Callable:
    """Store the history inputs and outputs for a particular function"""
    # Store the history of inputs and outputs for a particular function
    @wraps(method)
    def wrapper(self, *args):
        """Wrapper function"""
        # Store the input
        self._redis.rpush("{}:inputs".format(method.__qualname__), str(args))
        # Compute the output
        output = method(self, *args)
        # Store the output
        self._redis.rpush("{}:outputs".format(method.__qualname__), output)
        return output
    return wrapper


def replay(method: Callable):
    """Display the history of calls of a particular function"""
    # Display the history of calls of a particular function
    r = redis.Redis()
    # Get the number of times the function was called
    name = method.__qualname__
    count = r.get(name).decode("utf-8")
    # Get the inputs
    inputs = r.lrange("{}:inputs".format(name), 0, -1)
    # Get the outputs
    outputs = r.lrange("{}:outputs".format(name), 0, -1)
    # Display the history of calls of a particular function
    print("{} was called {} times:".format(name, count))
    # Display the history of inputs and outputs
    for i, o in zip(inputs, outputs):
        print("{}(*{}) -> {}".format(name, i.decode("utf-8"),
                                     o.decode("utf-8")))


class Cache:
    """Cache class"""
    def __init__(self):
        """  Create an instance of the Redis client and flush the database """
        self._redis = redis.Redis()
        self._redis.flushdb()

    @count_calls
    @call_history
    def store(self, data: Union[str, bytes, int, float]) -> str:
        """Store the input data in Redis using a randomly generated key"""
        # Generate a random key
        key = str(uuid.uuid4())
        # Store the input data in Redis using the random key
        self._redis.set(key, data)
        return key

    def get(self, key: str, fn: Optional[Callable] = None) -> Union[str,
                                                                    bytes,
                                                                    int,
                                                                    float]:
        """ Convert the data back to the desred format"""
        # Convert the data back to the desired format
        data = self._redis.get(key)
        # If the key does not exist, return None
        if not data:
            return None
        # Apply the function fn if necessary
        if fn:
            data = fn(data)
        return data

    def get_str(self, key: str) -> Optional[str]:
        """Convert bytes to string"""
        return self.get(key, fn=lambda x: x.decode("utf-8"))

    def get_int(self, key: bytes) -> int:
        """Convert bytes to int"""
        return self.get(key, fn=lambda x: int(x.decode("utf-8")))


# Usage example
if __name__ == '__main__':
    cache = Cache()
    cache.store("foo")
    cache.store("bar")
    cache.store(42)
    replay(cache.store)
