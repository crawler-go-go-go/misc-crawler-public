#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""
import binascii
import re

import requests
from Cryptodome.Cipher import AES
from Cryptodome.Util.py3compat import bchr

headers = {
    "accept": "*/*",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "origin": "https://www.dns.com",
    "referer": "https://www.dns.com/login.html",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36",
    "x-requested-with": "XMLHttpRequest"
}

session = requests.session()


def login(username, passwd):
    url = "https://www.dns.com/login"
    data = {
        "_token": get_csrf(),
        "password": encrypt(passwd),
        "email": encrypt(username),
        "redirectTo": "https://www.dns.com/dashboard"
    }
    print(f"login data = {data}")
    r = session.post(url, data=data, headers=headers)
    print(r.status_code)
    print(r.json())


def get_csrf():
    url = "https://www.dns.com/login.html"
    html = session.get(url, headers=headers).content.decode("UTF_8")
    return re.findall(r'csrfToken = "(\w+)";', html)[0]


def encrypt(s):
    # 完全用0来填充
    data_to_pad = s.encode()
    padding_len = AES.block_size - len(data_to_pad) % AES.block_size
    data = data_to_pad + bchr(0) * padding_len

    key = b"1234567890abcDEF"
    cipher = AES.new(key, mode=AES.MODE_CBC, iv=b"1234567890abcDEF")
    result = cipher.encrypt(data)
    return binascii.b2a_base64(result).decode().strip()


if __name__ == "__main__":
    # 接码平台注册的账号，只作为测试用
    login("16534084800", "ccIs0KccIs0K")
