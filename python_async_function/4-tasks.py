#!/usr/bin/env python3
"""Asynchronous routine that spawns 'wait_random'
n times with the specified max_delay"""


import asyncio
from typing import List
wait_random = async_generator = __import__('0-basic_async_syntax').wait_random


async def task_wait_n(n: int, max_delay: int = 10) -> List[float]:
    """args: n (int): the number of times the spawn 'wait_random'.
    max_delay (int): the max delay in seconds (default 10)
    returns: List[float]: a list of delays (float values)
    in ascending order."""
    tasks = [wait_random(max_delay) for _ in range(n)]
    delays = await asyncio.gather(*tasks)
    return sorted(delays)
