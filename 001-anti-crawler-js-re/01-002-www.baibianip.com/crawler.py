#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""
import base64
import re

import requests
from bs4 import BeautifulSoup


def crawl():
    url = "https://www.baibianip.com/home/free.html"
    html = requests.get(url).text
    # 从https://www.baibianip.com/home/indexjs?_t=1606231394.2582最下面取似乎更方便
    # 但是因为感觉不是很保险，于是还是老老实实从展示的地方取
    doc = BeautifulSoup(html, features="html.parser")
    ip_list = []
    for x in doc.select(".table td script"):
        # '<script>FFfatefully(\'ZGH5AmL3Zmx5ZwR2AF4lZwHhZmLhAwxkAwR1ZmNkAwRm\'); </script>'
        ss = re.findall(r"'(\w+)'", str(x))
        if ss:
            s = ss[0]
            ip_list.append(ddip(s))
    return ip_list


def ddip(s):
    t1 = r13_string(s)
    t2 = base64.b64decode(t1.encode("UTF-8")).decode("UTF-8")
    t3 = t2[10:]
    return t3[0:-10]


def r13_string(s):
    r = []
    for c in s:
        r.append(r13_char(c))
    return "".join(r)


def r13_char(c):
    if 'a' <= c <= 'z':
        return chr((ord(c) - ord('a') + 13) % 26 + ord('a'))
    elif 'A' <= c <= 'Z':
        return chr((ord(c) - ord('A') + 13) % 26 + ord('A'))
    else:
        return c


if __name__ == "__main__":
    # ['165.225.36.69', '43.250.124.98', '221.1.200.242', '1.20.99.61', '178.75.27.131', '177.129.40.78', '45.226.48.101', '96.9.73.80', '51.77.162.148', '170.185.68.14', '195.88.16.155', '178.47.139.50', '31.148.22.110', '81.163.35.120', '176.98.95.247', '114.30.75.206', '85.133.207.14', '106.249.44.10', '185.209.57.55', '186.216.81.21', '195.178.56.35', '151.106.10.52', '221.122.91.65', '81.163.36.210', '165.225.36.80', '170.239.144.2', '14.102.40.169', '212.56.218.90', '41.66.205.112', '195.98.74.141', '74.15.191.160', '71.17.253.132', '43.239.72.117', '103.4.165.122', '89.109.14.179', '51.77.211.175']
    print(crawl())

