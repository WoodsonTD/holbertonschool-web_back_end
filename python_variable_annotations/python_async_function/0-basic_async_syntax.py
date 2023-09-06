#!/usr/bin/env python3
"""Asynchronous coroutine that waits for a random delay between 0
and max_delay (inclusive)"""


import asyncio
import random


async def wait_random(max_delay: int = 10) -> float:
    """args: max_delay (int): the max delay in seconds (default is 10)
    returns: float:the random delay in seconds."""
    delay = random.uniform(0, max_delay)
    await asyncio.sleep(delay)
    return delay
