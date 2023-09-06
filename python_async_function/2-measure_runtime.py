#!/usr/bin/env python3
"""Measures the average execution time for 'wait_n' function
with 'n' executions and 'max_delay'"""


import asyncio
import time
from typing import List
wait_n = __import__('1-concurrent_coroutines').wait_n


def measure_time(n: int, max_delay: int) -> float:
    """args: n (int): the number of times to execute 'wait_n'
    max_delay (int): the maximum delay in seconds for 'wait_n'
    returns: float: the average execution time in seconds"""
    start_time = time.perf_counter()
    asyncio.run(wait_n(n, max_delay))
    end_time = time.perf_counter()
    return (end - start) / n
