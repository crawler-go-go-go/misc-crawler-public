#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""
import functools
import time

import execjs
import requests

session = requests.session()


def login(username, passwd):
    token = get_token()
    print(f"token = {token}")

    public_key = get_public_key()
    print(f"public key = {public_key}")

    data = {
        "username": username,
        "enPassword": load_js_context().call("encryptPasswd", passwd, public_key["modulus"], public_key["exponent"]),
        "service": "",
        "remember": True
    }
    print(data)

    headers = {
        # 这个参数是必须要带的，什么鬼情况，是后端的框架要检测还是手动做的检测，好像有些框架需要这个参数知道是个xhr请求
        "X-Requested-With": "XMLHttpRequest",
        # U-A反倒不是必须的...
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
        # token是必须要带的
        "token": token,
    }

    url = "https://www.500d.me/login/submit/"
    r = session.post(url, data=data, headers=headers)
    print(r.status_code)  # 200
    print(r.text)  # {"type":"success","content":""}


@functools.lru_cache(maxsize=1)
def load_js_context():
    with open("./encrypt.js", encoding="UTF-8") as f:
        js_code = f.read()
        return execjs.compile(js_code)


def get_token():
    url = "https://www.500d.me/login/"
    return session.get(url).cookies["token"]


def get_public_key():
    url = f"https://www.500d.me/common/public_key/?_={int(time.time() * 1000)}"
    return session.get(url).json()


if __name__ == "__main__":
    # 注册资料：
    # 邮箱： korowof384@rvemold.com
    # 昵称： cc11001100_test
    # 密码： ccIs0KccIs0K
    login("korowof384@rvemold.com", "ccIs0KccIs0K")
