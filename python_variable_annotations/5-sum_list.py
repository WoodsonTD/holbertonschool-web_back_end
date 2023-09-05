#!/usr/bin/env python3
"""calculates the sum of a list of floats"""


from typing import List


def sum_list(input_list: List[float]) -> float:
    """args: input_list (List[float]): the input list containg float numbers.
    returns: float: the sum of the elements in the input list as a float."""
    return sum(input_list)
