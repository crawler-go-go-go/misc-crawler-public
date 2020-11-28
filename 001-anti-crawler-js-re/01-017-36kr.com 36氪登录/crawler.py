#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""
import base64
import json
import time

import requests
from Cryptodome.Cipher import PKCS1_v1_5
from Cryptodome.PublicKey import RSA


def login(mobile, passwd):
    url = "https://gateway.36kr.com/api/mus/login/byMobilePassword"

    data = {
        "krtoken": "",
        "partner_id": "web",
        "timestamp": int(time.time() * 1000),
        "param": {
            "countryCode": "86",
            "mobileNo": encrypt(mobile),
            "password": encrypt(passwd)
        }
    }
    print(f"login data = {data}")
    headers = {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        # 这个请求头是必须设置的， 其它都是可选的
        "content-type": "application/json",
        "referer": "https://36kr.com/",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
    }
    r = requests.post(url, data=json.dumps(data), headers=headers)
    print(r.status_code)
    # {"code":0,"data":{"id":5364702,"nickName":"一起来流浪","faceUrl":"https://img.36krcdn.com/20201122/v2_82382fd7e323408887cb729bef5975e9_img_000","krtoken":"8HBTo4xB2vART6sU4e7ztjua09ndRvpcGOrWnxWGPKbHNzAwnKMjI-aoxIeGW8H7","mobileNo":"165****4800","hasNewUser":false,"resultType":0}}
    print(r.text)


def encrypt(s):
    public_key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCeiLxP4ZavN8qhI+x+whAiFpGWpY9y1AHSQC86qEMBVnmqC8vdZAfxxuQWeQaeMWG07lXhXegTjZ5wn9pHnjg15wbjRGSTfwuZxSFW6sS3GYlrg40ckqAagzIjkE+5OLPsdjVYQyhLfKxj/79oOfjl/lV3rQnk/SSczHW0PEyUbQIDAQAB"
    rsa_key = RSA.import_key(base64.b64decode(public_key))
    cipher = PKCS1_v1_5.new(rsa_key)
    return base64.b64encode(cipher.encrypt(s.encode(encoding="utf-8"))).decode("UTF-8")


if __name__ == "__main__":
    login("16534084800", "ccIs0KccIs0K")
