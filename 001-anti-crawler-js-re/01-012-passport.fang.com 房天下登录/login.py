#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""

import functools
import logging

import execjs
import requests

LOG_FORMAT = "%(asctime)s - %(levelname)s - %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)


def login(username, passwd):
    url = "https://passport.fang.com/login.api"
    data = {
        "uid": username,
        "pwd": get_js_context().call("encryptedPasswd", passwd),
        "Service": "soufun-passport-web",
        "AutoLogin": 1
    }
    logging.info(f"login data={data}")
    headers = {
        "Referer": "https://passport.fang.com/?backurl=https%3A%2F%2Fsh.fang.com%2F",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36"
    }
    response = requests.post(url, headers=headers, data=data).json()
    # 2020-11-28 23:35:33,700 - INFO - login result: {'Message': 'Success', 'Tip': '', 'UserID': 121043000, 'UserName': 'agent1837063166', 'UrlReferrer': None, 'BackUrl': '', 'LoginErrorCount': 0, 'Ip': '223.96.238.25', 'IsIpCanVisit': 'true', 'IsVerificationByMobilePhone': 1, 'PToken': '', 'NickName': '风的季节', 'UserId': 0, 'Avatar': ''}
    logging.info(f"login result: {response}")


@functools.lru_cache()
def get_js_context():
    logging.info("init execjs context")
    with open("./RSA.min.js", "r") as f:
        return execjs.compile(f.read())


if __name__ == "__main__":
    # 接码平台注册的账号，仅用于测试
    print(login("16534084800", "ccIs0KccIs0K"))
