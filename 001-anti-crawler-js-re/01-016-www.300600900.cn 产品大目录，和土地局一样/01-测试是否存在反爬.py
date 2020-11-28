#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""

import requests

if __name__ == "__main__":
    url = "http://www.300600900.cn/"
    headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7",
        "Cache-Control": "no-cache",
        "Host": "www.300600900.cn",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36"
    }
    r = requests.get(url, headers=headers)
    print(r.status_code)
    html = r.content.decode("UTF-8")

    with open("./debug-response.html", "w", encoding="UTF-8") as f:
        f.write(html)
