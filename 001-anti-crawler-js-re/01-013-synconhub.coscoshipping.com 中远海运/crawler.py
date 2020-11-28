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
    url = "https://synconhub.coscoshipping.com/api/admin/user/login"
    data = {
        "username": username,
        "password": load_js_context().call("encryptPasswd", passwd)
    }
    ECTIMGCAPTCHA = get_ECTIMGCAPTCHA()
    headers = {
        "Connection": "keep-alive",
        "Content-Length": "413",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        "sec-ch-ua": '"Chromium";v="86", "\"Not\\A;Brand";v="99", "Google Chrome";v="86"',
        "Accept": "application/json, text/plain, */*",
        "ECTIMGCAPTCHA": ECTIMGCAPTCHA,
        "sec-ch-ua-mobile": "?0",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded",
        "Origin": "https://synconhub.coscoshipping.com",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        "Referer": "https://synconhub.coscoshipping.com/",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7",
    }
    proxies = {
        "http": "localhost:1080",
        "https": "localhost:1080",
    }
    r = session.post(url, headers=headers, data=data, proxies=proxies)
    print(r.content.decode("utf-8"))


def get_ECTIMGCAPTCHA():
    url = f"https://synconhub.coscoshipping.com/api/common/captcha/image?d={int(time.time() * 1000)}"
    r = session.get(url)
    print(r)
    s = r.cookies["ECTIMGCAPTCHA"]
    print(f"ECTIMGCAPTCHA = {s}")
    return s


@functools.lru_cache()
def load_js_context():
    with open("./encrypt.js", encoding="UTF-8") as f:
        js_code = f.read().replace(u'\xa0', u'')
        return execjs.compile(js_code)


if __name__ == "__main__":
    login("CC11001100", "CCis0kHaoYanA")

    # 网宿云什么鬼
    # https://www.wangsu.com/
