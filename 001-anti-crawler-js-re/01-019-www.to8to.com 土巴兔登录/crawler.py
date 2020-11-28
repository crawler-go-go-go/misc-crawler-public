#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""
import base64
from urllib.parse import quote

import requests
from Cryptodome.Cipher import PKCS1_v1_5
from Cryptodome.PublicKey import RSA


def login(username, passwd):
    url = "https://www.to8to.com/new_login.php?referer=http://www.to8to.com/my/"
    headers = {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        "content-length": "534",
        "content-type": "application/x-www-form-urlencoded",
        "referer": "https://www.to8to.com/new_login.php?referer=http://www.to8to.com/my/",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
    }
    data = {
        "referer": "http://www.to8to.com/",
        "val": quote(encrypt(username)),
        "password": quote(encrypt(passwd)),
        "yzm": "1111"
    }
    print(f"login data = {data}")
    r = requests.post(url, data=data, headers=headers, allow_redirects=False)
    # 登录成功了之后就会重定向
    print(r.status_code)
    print(r.cookies)
    print(r.headers)
    print(r.text)

    # 太多了看不清，保存到本地看
    with open("./response.html", "w", encoding="UTF-8") as f:
        f.write(r.text)


def encrypt(s):
    # 标准的rsa调python的库就可以了
    public_key = r"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDhNhuAr4UjFv+cj99PbAQWWx9H 	X+3jSRThJqJdXkWUMFMTRay8EYRtPFIiwiOUU4gCh4ePMxiuZJWUBHe1waOkXEFc 	Kg17luhVqECsO+EOLhxa3yHoXA5HcSKlG85hNV3G4uQCr+C8SOE0vCGTnMdnEGmU 	nG1AGGe44YKy6XR4VwIDAQAB"
    rsa_key = RSA.import_key(base64.b64decode(public_key))
    cipher = PKCS1_v1_5.new(rsa_key)
    return base64.b64encode(cipher.encrypt(s.encode(encoding="UTF-8"))).decode("UTF-8")


if __name__ == "__main__":
    login("17199741371", "ccIs0KccIs0K")
