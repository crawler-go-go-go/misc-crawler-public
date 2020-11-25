#!/usr/bin/env python3
# encoding: utf-8
"""

滑块位置：
http://gcxm.hunanjs.gov.cn/dataservice.html


@author: CC11001100
"""

import base64
import io

import numpy
import requests
from PIL import Image

session = requests.session()


def crawl():
    image_matrix, top, verify_id = get_verify_img()

    # 滑块缺口的位置
    lack_x = find_lack(image_matrix, top)
    print(lack_x)

    submit(verify_id, lack_x)


def get_verify_img():
    url = "http://gcxm.hunanjs.gov.cn/AjaxHandler/PersonHandler.ashx?method=GetVerifyImg"
    response = session.get(url)
    # 是这么用的吗？我很懵逼...
    session.cookies.update(response.cookies)
    response_json = response.json()

    # 滑块背景图片
    image_base64 = response_json[1]
    image_bytes = base64.b64decode(image_base64)
    image = Image.open(io.BytesIO(image_bytes))
    image.save("a.png")
    image_matrix = numpy.asarray(image)

    # 本次验证的id
    verify_id = response_json[2]

    # 滑块距离顶部的距离
    top = int(response_json[3])

    print(response_json)

    return image_matrix, top, verify_id


def submit(verify_id, lack_x):
    url = "http://gcxm.hunanjs.gov.cn/AjaxHandler/PersonHandler.ashx"
    params = {
        "method": "GetListPage",
        "type": 1,
        "corptype_1": 2,
        "corpname_1": "",
        "licensenum_1": "",
        "Province_1": 430000,
        "City_1": "",
        "county_1": "",
        "persontype": "",
        "persontype_2": "",
        "personname_2": "",
        "idcard_2": "",
        "certnum_2": "",
        "corpname_2": "",
        "prjname_3": "",
        "corpname_3": "",
        "prjtype_3": "",
        "cityname_3": "",
        "year_4": 2020,
        "jidu_4": 3,
        "corpname_4": "",
        "corpname_5": "",
        "corpcode_5": "",
        "legalman_5": "",
        "cityname_5": "",
        "SafeNum_6": "",
        "corpname_6": "",
        "corpname_7": "",
        "piciname_7": "",
        "corptype_7": "",
        "corpname_8": "",
        "corpcode_8": "",
        "legalman_8": "",
        "cityname_8": "",
        "pageSize": 30,
        "pageIndex": 1,
        "xypjcorptype": 3,
        "moveX": lack_x,
        "verifyid": verify_id
    }
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest",
        "Referer": "http://gcxm.hunanjs.gov.cn/dataservice.html"
    }
    r = session.get(url, params=params, headers=headers)
    print(r.text)


def find_lack(image_matrix, top):
    """
    拿到缺块所在的列的x坐标
    :param image_matrix:
    :param top:
    :return:
    """
    for i in range(0, len(image_matrix[0])):
        count = 0
        for j in range(top, len(image_matrix)):
            point = image_matrix[j][i]
            cutoff = 230
            if point[0] >= cutoff and point[1] >= cutoff and point[2] >= cutoff:
                count += 1
        if count >= 30:
            return i
    return -1


if __name__ == "__main__":
    crawl()

