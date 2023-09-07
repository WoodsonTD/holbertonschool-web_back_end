#!/usr/bin/env python3
"""an asynchronous coroutine that collects 10 random numbers
using an async comprehension over the async_generator coroutine
and returns the colloected numbers"""


from typing import List
async_generator = __import__('0-async_generator').async_generator


async def async_comprehension() -> List[int]:
    """List[int]: a list of 10 random numbers"""
    return [i async for i in async_generator()]
