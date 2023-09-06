#!/usr/bin/env python3
"""creates and returs asyncio"""


import asyncio
wait_random = __import__('0-basic_async_syntax').wait_random


def task_wait_random(max_delay: int) -> asyncio.Task:
    """args: max_delay: maximum delay in seconds for wait_random
    return: asyncio.Task: ans asyncio.Task representing the
    execution of wait_random"""
    return asyncio.create_task(wait_random(max_delay))
