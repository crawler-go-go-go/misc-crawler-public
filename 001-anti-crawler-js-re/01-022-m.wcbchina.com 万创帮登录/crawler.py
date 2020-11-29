#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""

import json
from hashlib import md5
import requests
import time


def login(username, passwd):
    ts = int(time.time() * 1000)
    url = "https://m.wcbchina.com/api/login/login?rnd=0.8383069451510106"
    data = {
        # 这特么完全坑爹啊，auth sign不带也没关系
        "auth": {
            "timestamp": ts,
            "sign": encrypt(str(ts))
        },
        "username": username,
        "password": encrypt(passwd)
    }
    print(f"login body = {data}")
    r = requests.post(url, data=json.dumps(data))
    print(r.status_code)
    print(r.text)


def encrypt(s):
    return md5(s.encode("UTF-8")).hexdigest()


if __name__ == "__main__":
    login("13791488888", "ccIs0KccIs0K")
