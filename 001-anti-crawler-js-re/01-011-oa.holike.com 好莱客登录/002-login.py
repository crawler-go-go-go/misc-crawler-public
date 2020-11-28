#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""
import binascii
from urllib.parse import quote

import requests
from Cryptodome.Cipher import AES
from Cryptodome.Util.Padding import pad


def login(username, passwd):
    url = "http://oa.holike.com/j_acegi_security_check"
    data = {
        "j_username": username,
        "j_password": quote(encrypt_passwd(passwd)),
        "j_redirectto": ""
    }
    print(f"login data = {data}")
    headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7",
        "Content-Type": "application/x-www-form-urlencoded",
        "Host": "oa.holike.com",
        "Origin": "http://oa.holike.com",
        "Referer": "http://oa.holike.com/login.jsp?login_error=1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36"
    }
    r = requests.post(url, data=data, headers=headers)
    print(r.status_code)
    print(r.text)

    # for debug
    with open("./debug-response.html", "w", encoding="UTF-8") as f:
        f.write(r.text)


def encrypt_passwd(passwd):
    # 完全用0来填充，因为没有内置的pad，所以只好自己填充了
    data_to_pad = passwd.encode()
    data = pad(data_to_pad, AES.block_size)

    key = b"E31D139DEF5142C4"
    cipher = AES.new(key, AES.MODE_CBC, iv=b"A42265ECFBF93722")
    result = cipher.encrypt(data)
    return "䐵匠䴵" + binascii.b2a_base64(result).decode()


if __name__ == "__main__":
    # 尴尬，似乎没有注册账号的地方，我也没办法验证到底正不正确了...
    # 至少同样的字符串能得到同样的字符，至少说明算法就是这样...
    login("cc11001100_test", "ccIs0KccIs0K")
