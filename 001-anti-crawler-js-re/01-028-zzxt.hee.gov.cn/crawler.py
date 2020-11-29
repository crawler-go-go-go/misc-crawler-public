#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""

import base64
import io
import time
from hashlib import md5

import numpy as np
import pytesseract
import requests
from PIL import Image
from bs4 import BeautifulSoup

pytesseract.pytesseract.tesseract_cmd = (r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe")

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
}

session = requests.session()


def login(username, passwd):
    url = "http://zzxt.hee.gov.cn/Home.action"
    data = {
        "userName": base64.b64encode(username.encode("UTF-8")).decode("UTF-8"),
        "struts.token.name": "token",
        "token": get_token(),
        "password": md5(passwd.encode("UTF-8")).hexdigest(),
        "verifyCode": get_captcha()
    }
    print(data)
    r = session.post(url, data=data, headers=headers)
    print(r.status_code)
    # 搜索：
    # <div id="l1"><p class="error"><font size="2px">
    # 能够搜索到错误提示信息
    # 虽然我还是没办法注册账号去验证...
    print(r.text)


def get_token():
    url = "http://zzxt.hee.gov.cn/Home.action"
    html = session.get(url, headers=headers).text
    doc = BeautifulSoup(html, features="html.parser")
    return doc.select_one("[name=token]")["value"]


def get_captcha():
    url = "http://zzxt.hee.gov.cn/verifycode.do"
    params = {
        "width": 70,
        "height": 20,
        "codecount": 4,
        "codestyle": "digit",
        "timestamp": int(time.time() * 1000)
    }
    r = session.get(url, params=params, headers=headers)
    print(r.content)

    # for debug
    with open("./captcha.png", "wb") as f:
        f.write(r.content)

    # 处理掉图片中的干扰信息
    image = Image.open(io.BytesIO(r.content))
    image_matrix = np.array(image)
    for x in range(0, len(image_matrix)):
        for y in range(0, len(image_matrix[0])):
            point = image_matrix[x, y]
            # 设置一个cutoff把背景颜色过滤掉
            if point[0] <= 150 and point[1] <= 150 and point[2] >= 100:
                image_matrix[x, y] = (0, 0, 255)
            else:
                image_matrix[x, y] = (255, 255, 255)
    new_image = Image.fromarray(image_matrix)

    # for debug
    new_image.save("./captcha-1.png")

    s = pytesseract.image_to_string(new_image, lang="eng", config="--psm 6").strip()
    print(s)

    return s


if __name__ == "__main__":
    login("CC11001100", "passwd")
    # process_captcha()
