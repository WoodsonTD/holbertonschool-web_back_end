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
    def get(self, key: str, fn: Callable = None)
    -> Union[str, bytes, int, float]:
        value = self._redis.get(key)
        if fn is not None:
            return fn(value)
        return value

    """parametrize cache.get with correct conversion function"""
    def get_str(self, key: str) -> str:
        return self.get(key, fn=lambda data: data.decode("utf-8"))

    def get_int(self, key: str) -> int:
        return self.get(key, fn=int)

    def count_calls(method: Callable) -> Callable:
        @functools.wraps(method)
    def wrapper(self, *args, **kwargs):
        key = method.__qualname__
        count_key = f"{key}:count"
        self._redis.incr(count_key)
        return method(self, *args, **kwargs)
    return wrapper


# Decorate Cache.store with count_calls
Cache.store = count_calls(Cache.store)


def call_history(method: Callable) -> Callable:
    @functools.wraps(method)
    def wrapper(self, *args, **kwargs):
        key = method.__qualname__
        inputs_key = f"{key}:inputs"
        outputs_key = f"{key}:outputs"
        self._redis.rpush(inputs_key, str(args))
        result = method(self, *args, **kwargs)
        self._redis.rpush(outputs_key, str(result))
        return result
    return wrapper


# Decorate Cache.store with call_history
Cache.store = call_history(Cache.store)


def replay(cache: Cache):
    method_name = "Cache.store"
    inputs_key = f"{method_name}:inputs"
    outputs_key = f"{method_name}:outputs"
    inputs = cache._redis.lrange(inputs_key, 0, -1)
    outputs = cache._redis.lrange(outputs_key, 0, -1)
    for i, (input_data, output_data) in enumerate(zip(inputs, outputs):
                                                  print(f"{method_name}
                                                  was called {i + 1} times: ")
                                                  print(f"{method_name}
                                                  ({input_data}) ->
                                                  {output_data}")

                                                  if __name__ == "__main__":
                                                  cache=Cache()
                                                  cache.store("foo")
                                                  cache.store("bar")
                                                  cache.store(42)
                                                  replay(cache)
