#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""
import re
from urllib.parse import quote

import requests
from bs4 import BeautifulSoup

session = requests.session()


def search(keyword):
    url = f"http://so.wedatas.cn/s?siteCode=000000&tab=all&qt={keyword}"
    html = session.get(url).text

    # for debug
    with open("./search-response.html", "w", encoding="UTF-8") as f:
        f.write(html)

    headers = {
        # 用mod-header确定搜索结果点进去的时候必须要设置refer否则不返回链接
        "Referer": quote(url)
    }
    result = []
    doc = BeautifulSoup(html, features="html.parser")
    for item in doc.select(".news .title a"):
        # 搜索结果页中的只是临时地址，实际访问的时候会有一个跳转
        item_temp_link = "http://so.wedatas.cn/" + item["href"]
        html = session.get(item_temp_link, headers=headers).text

        # for debug
        with open("./search-response-item.html", "w", encoding="UTF-8") as f:
            f.write(html)

        real_link = re.findall(r'location.href = "(.+?)";', html)[0]
        result.append({
            "title": item.text.strip(),
            "link": real_link
        })
    return result


if __name__ == "__main__":
    print(search("户口"))
