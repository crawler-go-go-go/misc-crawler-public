#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""
import binascii

import requests
from Cryptodome.Cipher import DES
from Cryptodome.Util.Padding import pad


def login(username, passwd):
    url = "https://m.mtime.cn/Service/callback-comm.mi/user/login.api"
    data = {
        "t": get_t(),
        "name": username,
        "password": encrypt_passwd(passwd),
        "code": "",
        "codeId": ""
    }
    print(f"login data = {data}")
    headers = {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Host": "m.mtime.cn",
        "Origin": "https://m.mtime.cn",
        "Referer": "https://m.mtime.cn/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36",
        "X-Mtime-Wap-CheckValue": "mtime"
    }
    r = requests.post(url, data=data, headers=headers)
    print(r.status_code)
    # {"code":"1","data":{"codeId":"","codeUrl":"","hasPassword":true,"msg":"登录成功","needBindMobile":false,"serviceEmail":"service@mtime.com","skipBindMobileText":"跳过绑定直接登陆","status":1,"user":{"dataEncryption":"7C4DCBDE5053AD1B85C6E35A8F5DE807","gender":3,"headImg":"http://img2.mtime.cn/images/default/head.gif","mobile":"16534084800","nickname":"真诚的房子斌","userId":171153458}},"msg":"成功","showMsg":""}
    print(r.text)


def get_t():
    # 这个参数不设置也可以，demo就偷懒不设置了...
    return None


def encrypt_passwd(passwd):
    data = pad(passwd.encode(), 16)
    key = b"20161216"
    cipher = DES.new(key, DES.MODE_ECB)
    result = cipher.encrypt(data)
    return binascii.b2a_hex(result).decode()


if __name__ == "__main__":
    # 用接码平台注册的账号，只是为了测试
    login("16534084800", "ccIs0KccIs0K")
