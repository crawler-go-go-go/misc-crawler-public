#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""
import base64
import functools
import json

import execjs
import requests
from Cryptodome.Cipher import PKCS1_v1_5
from Cryptodome.PublicKey import RSA


def login(username, passwd):
    """
    登录
    :param username:
    :param passwd:
    :return:
    """
    data = {
        "mobile": username,
        "password": passwd,
        "source_type": 0
    }
    data = encrypt_to_code(data)
    print(f"login data = {data}")
    url = "https://api2.xfb315.com/v6.5.1/login"
    r = requests.post(url, data=data)
    print(r.status_code)
    print(r.json())


def get_tousu(tousu_id):
    """
    获取投诉详情
    :param tousu_id:
    :return:
    """
    url = f"https://api2.xfb315.com/v6.5.1/complaint/detailinfo"
    data = {
        "id": tousu_id
    }
    data = encrypt_to_code(data)
    headers = {
        # 必须要带的，否则不返回东西
        "source": "pc",
        # 可以不带
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
    }
    print(f"get tousu data = {data}")
    r = requests.post(url, data=data, headers=headers)
    print(r.status_code)
    print(r.json())


def encrypt_to_code(json_table):
    s = json.dumps(json_table)

    # 废弃，不再执行js获取
    # code = load_js_context().call("encryptToCode", s)

    # 标准的rsa调python的内置库就可以了
    public_key = "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA6j0DsaBPHiW4GOAOihZL0jzh7seoj8IKlRSj3fj6TJked/OAhC7Q0AdVdHIeXQrEQ2Y2z6BSul0gkNi0rg+b2Ugf8dZG3qGe7gyv1midmTZgmIdgr17VlYPpo0HRMu+2K3u/lpfeVInyR9IWv+0z6+PztcxnlmcxH/if4GKFVFacpM6U2iPgLRbqlLafASMGW4VpffPGLYLCR9x69FgJJLsMqfbqsqwZEWOl/eEoS846D6mQmh7Wm8XtFwbDGjFgGrExA6tFl17DxbLJZIQvnmezG4jN5pxcDZX+ViuFhJNA0CIvA/nlnkd80mZMEkHKLF6MtxzuZZPMb9YRZyhgk0gy+5P7rlFP1jDj9aHbgB79ZFQwdsmrtRUuPWk6VwtwUXcn8AyanFrB+Y4Ti9M0ReQl+qV96ANbcZxberBfjsPZ/2g34ei1yYKqTZZu6AYnK42hAQ0Fx2toVHH7JUY3FO1Hnz6v4eZXr0+6x6EwKSV1B1xHwTIkJ8AW2kJYfgARFpPLGWvrDEom1IrAVe0VEBR9BNrplF8sNptyl7IQjChtePD7MKTY4ZoURmJihNF59zIdwDcnYSJ2zA615L0iYW7yJlRNNfVVZJLkhjoIiJOx5rj8ZI+OowFtdWXfvz5aC5clqd3SNvBZw+aRsD8f+CIoALPTrNr4dTNrzapDnM8CAwEAAQ=="
    rsa_key = RSA.import_key(base64.b64decode(public_key))
    cipher = PKCS1_v1_5.new(rsa_key)
    code = base64.b64encode(cipher.encrypt(s.encode(encoding="UTF-8")))
    return {
        "code": code
    }


@functools.lru_cache(maxsize=1)
def load_js_context():
    with open("./encrypt.js", encoding="UTF-8") as f:
        js_code = f.read()
        return execjs.compile(js_code)


if __name__ == "__main__":
    login("13791488888", "ccIs0KccIs0K")
    get_tousu("94739696")
