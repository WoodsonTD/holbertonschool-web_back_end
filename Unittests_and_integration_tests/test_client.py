#!/usr/bin/env python3
"""Test fixtures
"""
import unittest
from unittest.mock import patch, PropertyMock
from parameterized import parameterized, parameterized_class
from requests import HTTPError
from client import GithubOrgClient
from fixtures import TEST_PAYLOAD


class TestGithubOrgClient(unittest.TestCase):
    """TestGithubOrgClient"""
    @parameterized.expand([
        ("google"),
        ("abc"),
    ])
    @patch('client.get_json')
    def test_org(self, org_name, mock_get_json):
        """Test that GithubOrgClient.org returns the correct value"""
        mock_payload = {'name': org_name, 'id': 1234}
        mock_get_json.return_value = mock_payload
        test_class = GithubOrgClient(org_name)
        self.assertEqual(test_class.org, mock_payload)
        mock_get_json.assert_called_once_with
        (f'https://api.github.com/orgs/{org_name}')

def test_public_repos_url(self, mock_public_repos_url):
        """Test that the result of _public_repos_url is the expected one"""
        expected = 'www.yes.com'
        mock_public_repos_url.return_value = expected
        test_class = GithubOrgClient('test')
        self.assertEqual(test_class._public_repos_url, expected)