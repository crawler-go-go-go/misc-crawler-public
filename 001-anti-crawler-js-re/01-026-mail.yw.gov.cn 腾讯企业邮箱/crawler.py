#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""
import functools
import time

import execjs
import requests
from bs4 import BeautifulSoup

headers = {
    "Referer": "http://mail.yw.gov.cn/",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
}

session = requests.session()


def login(username, passwd):
    server_time = get_form_params()
    url = "http://mail.yw.gov.cn/cgi-bin/login"
    data = {
        "sid": "",
        "firstlogin": True,
        "domain": "yw.gov.cn",
        "logindomain": "yw.gov.cn",
        "aliastype": "other",
        "errtemplate": "logindomain",
        "first_step": "",
        "buy_amount": "",
        "year": "",
        "company_name": "",
        "is_get_dp_coupon": "",
        "source": "",
        "qy_code": "",
        "origin": "",
        # document.form1.starttime.value = (new Date()).valueOf();
        "starttime": str(time.time() * 1000),
        "redirecturl": "",
        "f": "biz",
        "uin": username,
        "p": encrypt_passwd(passwd, server_time),
        "login_from": "mail_login_yw.gov.cn",
        "vt": "",
        "delegate_url": "",
        # 服务器返回的
        "ts": server_time,
        "from": "",
        "ppp": "",
        "chg": 0,
        "domain_bak": 0,
        "loginentry": 0,
        "s": "",
        "dmtype": "",
        "fun": "",
        "inputuin": username,
        "pp": "000000",
        "verifycode": "",
        "area": "",
        "mobile": "",
        "captcha_val": "",
        "sms_token": ""
    }
    print(data)
    r = session.post(url, data=data, headers=headers).text
    print(r)
    with open("./login-response.html", "w", encoding="UTF-8") as f:
        f.write(r)


def encrypt_passwd(passwd, server_time):
    return load_js_context().call("encryptPasswd", passwd, server_time)


@functools.lru_cache(maxsize=1)
def load_js_context():
    with open("./safeauth.js", encoding="UTF-8") as f:
        js_code = f.read()
        return execjs.compile(js_code)


def get_form_params():
    url = "http://mail.yw.gov.cn/cgi-bin/loginpage"
    html = session.get(url, headers=headers).text
    doc = BeautifulSoup(html, features="html.parser")
    server_time = doc.select_one("[name=ts]")["value"]
    return server_time


if __name__ == "__main__":
    login("CC11001100", "passwd")
