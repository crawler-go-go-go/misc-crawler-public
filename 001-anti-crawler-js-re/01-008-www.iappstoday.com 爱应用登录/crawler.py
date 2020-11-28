#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""
import functools

import execjs
import requests


def login(username, passwd):
    url = "http://www.iappstoday.com/ajax/login"
    data = {
        "username": username,
        # 好像随便输都不会验证，也没办法注册新用户了，似乎没有办法验证是否正确了
        "password": encrypt_passwd(passwd)
    }
    print(data)
    r = requests.post(url, data=data)
    print(r.text)
    # -1表示用户不存在
    # {"html":null,"uid":-1,"username":null,"ucsynlogin":null}


def encrypt_passwd(passwd):
    return load_js_context().call("encryptPasswd", passwd)


@functools.lru_cache(maxsize=1)
def load_js_context():
    with open("./seclib.js", "r", encoding="UTF-8") as f:
        js_code = f.read()
        return execjs.compile(js_code)


if __name__ == "__main__":
    # 禁止新用户注册了，得想个办法验证一下，
    # 意外惊喜，得到了一个能用的账号，不要问我这个账号咋来的，懂的都懂...
    login("asdasdasd", "asdasdasd")
