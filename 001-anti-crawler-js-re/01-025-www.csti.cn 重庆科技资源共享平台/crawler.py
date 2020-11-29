#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""
import functools
import re

import execjs
import requests

session = requests.session()

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
}


def login(username, passwd):
    url = "http://www.csti.cn/uc/login/servicelogin.do?method=login"
    encrypted_passwd = encrypt_passwd(passwd, get_login_salt())
    data = {
        "account": username,
        "pwd": encrypted_passwd,
        "verify_code": "",
        "hid_remember_me": 0,
        "hid_remember_login_state": 0,
        "password": encrypted_passwd
    }
    print(data)
    r = session.post(url, data=data, headers=headers)
    print(r.status_code)
    # 我靠这网站好像可以检测是否注册过...
    # 账号不存在是-5
    # 密码错误是-1
    print(r.text)


def encrypt_passwd(passwd, login_salt):
    s = load_js_context().call("toMD5Str", passwd)
    return load_js_context().call("toMD5Str", s + login_salt)


@functools.lru_cache(maxsize=1)
def load_js_context():
    with open("md5.js") as f:
        js_code = f.read()
        return execjs.compile(js_code)


def get_login_salt():
    url = "http://www.csti.cn/uc/login/serviceLogin.htm"
    html = session.get(url, headers=headers).text

    return re.findall(r'var login_salt = "(\d+)";', html)[0]


if __name__ == "__main__":
    # print(get_login_salt())

    # 与网页上同样的参数得到了完全一样的结果
    # 1c7e614fb2e7e9d6fa492d59678a3690
    # print(encrypt_passwd("passwd", "857875"))

    login("CC11001100", "ccIs0KccIs0K")
