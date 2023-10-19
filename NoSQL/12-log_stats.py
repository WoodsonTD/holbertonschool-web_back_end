#!/usr/bin/env python3
""" 12. Log stats """
from pymongo import MongoClient


client = MongoClient('mongodb://172.17.0.2:27017')
db = client.logs
logs = db.nginx

def log_stats():
    """ provides some stats about Nginx logs stored in MongoDB """
    print("{} logs".format(logs.count_documents({})))
    print("Methods:")
    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    for method in methods:
        print("\tmethod {}: {}".format(method, logs.count_documents({"method": method})))

    print("{} status check".format(logs.count_documents({"method": "GET", "path": "/status"})))


if __name__ == "__main__":
    log_stats()
