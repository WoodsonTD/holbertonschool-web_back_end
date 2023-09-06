#!/usr/bin/env python3
"""returns a function that multiplies a float by the specified multiplier."""

from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """args: multiplier (float): the multiplier value
    returns: Callable[[float] float]: a function that takes a float and
    returns the result of multiplying it by the multiplier."""
    return lambda x: x * multiplier
