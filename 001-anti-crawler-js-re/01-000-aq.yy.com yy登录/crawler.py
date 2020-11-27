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


def login(username, passwd):
    url = "https://lgn.yy.com/lgn/oauth/x2/s/login_asyn.do"
    data = {
        "username": username,
        "pwdencrypt": encrypt_passwd(passwd),
        "oauth_token": get_token(),
        "denyCallbackURL": "",
        "UIStyle": "xelogin",
        "appid": "1",
        "cssid": "1",
        "mxc": "",
        "vk": "",
        "isRemMe": "0",
        "mmc": "",
        "vv": "",
        "hiido": "1"
    }
    print(data)
    headers = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Host": "lgn.yy.com",
        "Origin": "https://lgn.yy.com",
        "Pragma": "no-cache",
        "Referer": "https://aq.yy.com/index.do",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest"
    }
    r = session.post(url, data=data, headers=headers)
    html = r.text

    # 登录成功之后长啥样啊
    # {"code":"0","msg":null,"obj":{"callbackURL":"https://aq.yy.com/p/logincbk.do?jump=https://aq.yy.com/welcome.do&oauth_token=8d5...dd6&oauth_verifier=9b...c8&isRemMe=0","redirectURL":null,"vk":null,"vt":null,"pos":"1","verifyid":null,"qin":"up","yyuid":20000,"passport":"xxxx","svpic":null,"itvjs":null,"strategy":null},"hdcode":"0"}
    print(r.status_code)
    print(html)

    with open("./response.html", "w", encoding="UTF-8") as f:
        f.write(html)


def encrypt_passwd(passwd):
    return load_js_context().call("encryptedString", passwd)


@functools.lru_cache(maxsize=1)
def load_js_context():
    with open("./udb.sdk.rsa.js", encoding="UTF-8") as f:
        js_code = f.read()
        return execjs.compile(js_code)


def get_token():
    url = "https://aq.yy.com/p/wklogin.do?callbackURL=https://aq.yy.com/welcome.do"
    r = session.get(url).json()
    token = re.findall(r"oauth_token=(\w+)", r["url"])[0]
    print(f"get token={token}")
    return token


if __name__ == "__main__":
    # get_token()
    # 注册是上行短信，用自己手机号注册测试的，这里就不贴账号了
    login("xxxxxxxx", "xxxxxxxx")
