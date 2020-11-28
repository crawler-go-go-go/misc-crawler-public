#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""

import functools
import json
import re

import execjs
import requests
import json


# 貌似要翻墙，挂个代理
proxies = {
    "http": "localhost:1080",
    "https": "localhost:1080",
}


def crawl(book_id, chapter_id):
    url = f"https://www.manhuagui.com/comic/{book_id}/{chapter_id}.html"
    html = requests.get(url, proxies=proxies).text
    print(html)
    js_code = re.findall(r'\\x65\\x76\\x61\\x6c"\](.+?)</script>', html)[0]
    print(js_code)

    result_js = load_js_context().call("evalEval", js_code)
    print(result_js)

    result_json_str = re.findall(r"SMH.imgData\((.+?)\)", result_js)[0]
    result_json = json.loads(result_json_str)
    print(json.dumps(result_json))



def download_image(image_url):
    return requests.get(image_url).content


@functools.lru_cache()
def load_js_context():
    with open("./LZString.js", "r", encoding="UTF-8") as f:
        js_code = f.read()
        return execjs.compile(js_code)


if __name__ == "__main__":
    crawl("19430", "523397")
