#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""

import hashlib
import time

import requests


def crawl(page, num=15):
    # 需要先访问doc拿到一个cookie
    session = requests.session()
    url = "http://3bodyhome.com/proxy"
    r = session.get(url)
    print(f"拿到了cookie{r.cookies}")

    # 然后再访问接口才能拿到正确的响应
    # 没有cookie访问接口会返回：
    # {"msg": "emmm...", "status": false}
    ts = int(time.time())
    token = hashlib.md5(f"{page}{num}{ts}".encode("UTF-8")).hexdigest()
    url = f"http://3bodyhome.com/proxy?page={page}&num={num}&token={token}&t={ts}"
    print(url)
    return session.get(url).text


if __name__ == "__main__":
    print(crawl(1))  # {"status": "true", "list": "OUhcUg=="}
