#!/usr/bin/env python3
"""calculates the lenth of each element in the input list and returns
    a list of tuples."""


from typing import List, Tuple


def element_length(lst: List[str]) -> List[Tuple[str, int]]:
    """args: lst (List[str]): the input list of strings.
    returns: a list of tuples where each tubple contains a string
    from the input list and its corresponding lenght as
    an integer."""
    return [(i, len(i)) for i in lst]
