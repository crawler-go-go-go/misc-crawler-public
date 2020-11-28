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
    # 1. 先请求页面拿到验证码
    url = "https://www.landchina.com/"
    html = session.get(url).content.decode("UTF-8")
    doc = BeautifulSoup(html, features="html.parser")
    captcha_base64 = doc.select_one("img.verifyimg")["src"].replace("data:image/bmp;base64,", "")
    captcha_bytes = base64.b64decode(captcha_base64.encode("UTF-8"))

    # for debug
    with open("./captcha.png", "wb") as f:
        f.write(captcha_bytes)

    captcha_image = Image.open(io.BytesIO(captcha_bytes))
    # 直接识别就有很高的识别率了
    captcha = pytesseract.image_to_string(captcha_image, "eng",
                                          config="--psm 3 -c tessedit_char_whitelist=0123456789").strip()

    # 2. 然后提交验证码，拿到通过验证码的cookie： security_session_high_verify
    set_srcurl_cookie(url)
    url = "https://www.landchina.com/?security_verify_img=" + string_to_hex(captcha)
    r = session.get(url)
    print(f"拿到了通过验证码的cookie: {r.cookies}")
    del session.cookies["srcurl"]

    # 3. 然后再请求页面，就能拿到真正的响应数据了
    url = "https://www.landchina.com/default.aspx?tabid=261&ComName=default"
    html = session.get(url).content.decode("GB2312")
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
