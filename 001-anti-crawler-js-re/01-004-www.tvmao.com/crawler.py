#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""
import base64
import datetime
from urllib.parse import quote

import requests
from bs4 import BeautifulSoup

session = requests.session()


def crawl(url):
    headers = {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7",
        "Host": "www.tvmao.com",
        "Pragma": "no-cache",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
    }
    # 节目单的上半部分没有加密，这里不再解析
    html = session.get(url, headers=headers).text

    # for debug
    with open("./response-01.html", "w", encoding="UTF-8") as f:
        f.write(html)

    p = get_param_p(html)
    print(f"计算出 p = {p}")

    headers["Referer"] = url
    headers["X-Requested-With"] = "XMLHttpRequest"
    url = "https://www.tvmao.com/api/pg?p=" + quote(p)
    response = session.get(url, headers=headers).json()

    # for debug
    with open("./response-02.html", "w", encoding="UTF-8") as f:
        f.write(response[1])

    print(response)


def get_param_p(html):
    doc = BeautifulSoup(html, features="html.parser")
    form = doc.select_one("form")

    d = datetime.datetime.now()
    week = d.weekday() - 1
    if week == 0:
        week = 7
    week = week * week
    f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="[week]

    x = form.select_one("button[type=submit]")["id"]
    t1 = b64_s(x + "|" + form["a"])

    v = b64_s("|" + form["q"])

    return f + t1 + v


def b64_s(s):
    """
    各种算算看的晕晕，为了避免混淆视听，将不重要内容尽量缩短
    :param s:
    :return:
    """
    return base64.b64encode(s.encode("UTF-8")).decode("UTF-8")


if __name__ == "__main__":
    crawl("https://www.tvmao.com/program/CCTV-CCTV1-w3.html")
