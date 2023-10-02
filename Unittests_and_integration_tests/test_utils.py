#!/usr/bin/env python3
""" Test Utils """

import unittest
from parameterized import parameterized
from utils import access_nested_map, get_json, memoize
from unittest.mock import patch, Mock


class TestAccessNestedMap(unittest.TestCase):
    """TestAccessNestedMap"""

    @parameterized.expand([
        ({'a': 1}, ('a',), 1),
        ({'a': {'b': 2}}, ('a',), {'b': 2}),
        ({'a': {'b': 2}}, ('a', 'b'), 2)
    ])
    def test_access_nested_map(self, nested_map, path, expected):
        """TestAccessNestedMap"""
        self.assertEqual(access_nested_map(nested_map, path), expected)

    @parameterized.expand([
        ({}, ('a',), KeyError),
        ({'a': 1}, ('a', 'b'), KeyError)
    ])
    def test_access_nested_map_exception(self, nested_map, path, expected):
        """TestAccessNestedMap exception"""
        with self.assertRaises(expected):
            access_nested_map(nested_map, path)
