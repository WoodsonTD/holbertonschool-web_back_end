#!/usr/bin/env python3
"""calculates the lenth of each element in the input list and returns
    a list of tuples."""


from typing import Iterable, Sequence, List, Tuple


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """args: lst (List[str]): the input list of strings.
    returns: a list of tuples where each tubple contains a string
    from the input list and its corresponding lenght as
    an integer."""
    return [(i, len(i)) for i in lst]
