#!/usr/bin/env python3
"""Calculates the sum of a list containing intergers and floats"""


from typing import List, Union


def sum_mixed_list(mxd_lst: List[Union[int, float]]) -> float:
    """args: mxd_lst: the input list containg integers and floats
    return: float: the sum of elements in the input list as a float"""
    return sum(mxd_lst)
