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

 @patch('client.get_json')
    def test_public_repos(self, mock_get_json):
        """Test GithubOrgClient.public_repos"""
        mock_get_json.return_value = [
            {"name": "repo1"},
            {"name": "repo2"},
        ]
        with patch.object(
            GithubOrgClient,
            '_public_repos_url',
            new_callable=PropertyMock
        ) as mock_public_repos_url:
            mock_public_repos_url.return_value = "www.yes.com"
            test_class = GithubOrgClient("test")
            result = test_class.public_repos()
            self.assertEqual(result, ["repo1", "repo2"])
            mock_public_repos_url.assert_called_once()
            mock_get_json.assert_called_once()

@parameterized.expand([
            ({"license": {"key": "my_license"}}, "my_license", True),
            ({"license": {"key": "other_license"}}, "my_license", False),
        ])
    def test_has_license(self, repo, license_key, expected):
        """Test that GithubOrgClient.has_license"""
        test_class = GithubOrgClient("test_org")
        self.assertEqual(test_class.has_license(repo, license_key), expected)
