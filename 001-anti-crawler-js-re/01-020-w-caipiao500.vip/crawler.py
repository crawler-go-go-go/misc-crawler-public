#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""
import base64
import random
from hashlib import md5

import requests


def login(username, passwd):
    url = "http://w-caipiao500.vip/v1/users/login"
    _random = "dafacloud_" + str(random.random())
    random_base64 = base64.b64encode(_random.encode("UTF-8")).decode("UTF-8")
    data = {
        "userName": username,
        "password": encrypt_passwd(username, passwd, _random),
        "random": random_base64
    }
    r = requests.post(url, data=data)
    print(r.status_code)
    # 网站注册需要邀请码，猜测这样应该算是对了吧，反正服务器知道我在说什么了...
    # {"msg":"账号或密码错误","code":-1,"data":4}
    print(r.text)


def encrypt_passwd(username, passwd, _random):
    t1 = username.lower() + md5(passwd.encode("UTF-8")).hexdigest()
    t2 = md5(t1.encode("UTF-8")).hexdigest() + _random
    return md5(t2.encode("UTF-8")).hexdigest()


if __name__ == "__main__":
    login("cc11001100", "ccIs0KccIs0K")
