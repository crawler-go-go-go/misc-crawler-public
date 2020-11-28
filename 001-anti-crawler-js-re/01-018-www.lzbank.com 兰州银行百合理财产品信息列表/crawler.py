#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""
import functools

import execjs
import requests


def crawl():
    url = "https://www.lzbank.com/cportalweb/public/lilyMangeMoney/getLilyMangeMoneyAllList.xhtml?fromUrl=https://www.lzbank.com/public/pbhlc.html&t=1606372158405"
    # 貌似随便来点啥都行，向weiwei同学送去问候
    orginalData = "随便来点啥都行"
    jCryption = load_js_context().call("encryptUrl", orginalData)
    data = {
        "pageNo": 1,
        "status": "-1",
        "bhlc_type": 1,
        "bhlc_PrdTemplate": 1,
        "bhlc_risklevel": 0,
        "bhlc_pfirstamt": "不限",
        "bhlc_duration": "",
        "_is_ajax": True,
        "orginalData": orginalData,
        "jCryption": jCryption
    }
    headers = {
        "Accept": "text/html, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Length": "510",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Host": "www.lzbank.com",
        "Origin": "https://www.lzbank.com",
        "Pragma": "no-cache",
        "Referer": "https://www.lzbank.com/public/pbhlc.html",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest"
    }
    r = requests.post(url, data=data, headers=headers)
    print(r.status_code)
    print(r.text)

    # for debug
    with open("./response.html", "w") as f:
        f.write(r.text)


@functools.lru_cache(maxsize=1)
def load_js_context():
    with open("./jquery.jcryption-去掉jQuery依赖.js", "r", encoding="UTF-8") as f:
        js_code = f.read()
        return execjs.compile(js_code)


if __name__ == "__main__":
    crawl()
