#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""
import random

import requests
from bs4 import BeautifulSoup


def crawl():
    url = "http://60.173.254.126/"
    html = requests.get(url).text
    doc = BeautifulSoup(html, features="html.parser")
    iptstamp = doc.select_one("#iptstamp")["value"]

    r = {}
    for x in doc.select("a[id][onclick][title][style]"):
        id = x["id"]
        link = "http://60.173.254.126/item/" + recode(id, iptstamp)
        title = x["title"]
        r[title] = link
    return r


def recode(s, iptstamp):
    n = nscaler(s)
    c = set_obj_num(len(n))
    d = set_obj_num(len(n))
    n = int(n) + int(d)
    b = nscaler(iptstamp)
    return str(c) + "-" + str(n) + "-" + str(d) + "-" + str(b)


def set_obj_num(n):
    r = 0
    for _ in range(0, n):
        r += int(random.random() * 10)
    return r


def nscaler(s):
    mapping = {
        0: 0,
        1: 2,
        2: 5,
        3: 8,
        4: 6,
        5: 1,
        6: 3,
        7: 4,
        8: 9,
        9: 7,
    }
    result = 0
    for x in s:
        result = result * 10 + mapping[int(x)]
    return str(result)


if __name__ == "__main__":
    print(crawl())
