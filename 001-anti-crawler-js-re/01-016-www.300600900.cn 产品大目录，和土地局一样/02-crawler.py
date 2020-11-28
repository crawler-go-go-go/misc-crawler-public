#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""
import base64
import io

import pytesseract
import requests
from PIL import Image
from bs4 import BeautifulSoup

pytesseract.pytesseract.tesseract_cmd = (r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe")

session = requests.session()


def crawl():

    # 1. 先请求一下主页，不过看第二步似乎这一步可以省略？
    # 这一步是不能省略的，要访问url拿到yunsuo_session_verify这个cookie
    url = "http://www.300600900.cn/"
    html = session.get(url).content.decode("UTF-8")
    print(session.cookies)

    # 2. 然后通过检测，拿到cookie
    # 这里与土地局不同的是它检测的是屏幕
    set_srcurl_cookie(url)
    url = "http://www.300600900.cn/?security_verify_data=" + string_to_hex("1280,720")
    r = session.get(url)
    print(f"拿到了通过验证码的cookie: {r.cookies}")
    del session.cookies["srcurl"]

    # 3. 然后再请求页面，就能拿到真正的响应数据了
    url = "http://www.300600900.cn/"
    html = session.get(url).content.decode("UTF-8")
    print(html)

    # for debug
    with open("./response.html", "w", encoding="UTF-8") as f:
        f.write(html)


def set_srcurl_cookie(url):
    """
    这个cookie实际上不设置也能拿到，但是为了与它流程保持一致还是设置一下吧...
    :param url:
    :return:
    """
    session.cookies["srcurl"] = string_to_hex(url)


def string_to_hex(s):
    """
    var val = "";
    for (var i = 0; i < str.length; i++) {
        if (val == "") val = str.charCodeAt(i).toString(16);
        else val += str.charCodeAt(i).toString(16);
    }
    return val;
    :param s:
    :return:
    """
    result = []
    for x in s:
        # 不要0x前缀
        result.append(hex(ord(x))[2:])
    return "".join(result)


if __name__ == "__main__":
    crawl()
