#!/usr/bin/evn python3
"""takes a sting 'k' and an integer or float 'v' as arguments and
returns a tuple. the first element of the tuple is 'k', and the
second element is the square of 'v', annotated as a float."""


from typing import Union, Tuple


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """args: k (str): the input string 'k'. v (Union[int, float]):
    the input integer or float 'v'
    returns: a tuple conating 'k' and the square of 'v' as a float"""
    result = float(v) ** 2
    return k, result
