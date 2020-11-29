#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""

from hashlib import md5

import requests


def login(username, passwd):
    url = "https://passport.vip.com/login"
    data = {
        "loginName": username,
        "password": md5(passwd.encode("UTF-8")).hexdigest(),
        "remUser": 0,
        "whereFrom": "",
        "captchaId": "",
        "captchaTicket": ""
    }
    print(data)
    headers = {
        "referer": "https://passport.vip.com/login",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
    }
    cookies = {
        # 必须要带这个cookie，但是并没有对值做检查，所以...
        "mars_cid": "a"
    }
    r = requests.post(url, data=data, headers=headers, cookies=cookies)
    print(r.status_code)
    # {"result":"success","errorCode":0,"data":{"redirectUrl":"https://www.vip.com","captchaFlowData":null,"extend":null,"bindMobile":true,"illegalState":false},"redirectUrl":"https://www.vip.com"}
    print(r.text)


if __name__ == "__main__":
    # 接码平台注册的账号，仅用于测试
    login("18411632868", "ccIs0KccIs0K")
