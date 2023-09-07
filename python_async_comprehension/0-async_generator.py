#!/usr/bin/env python3
"""an asynchronous coroutine that yields random numbers
between 0 and 10
after waiting asynchonously for 1 second
in each iteration."""


import asyncio
import random
from typing import AsyncGenerator


async def async_generator() -> AsyncGenerator[int, None]:
    """Yields: int: a random number between 0 and 10."""
    for _ in range(10):
        await asyncio.sleep(1)  # wait 1 second
        yield random.randint(1, 10)  # yield random number between 0 and 10
