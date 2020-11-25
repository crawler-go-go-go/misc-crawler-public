#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""
import io
import logging

import numpy
import requests
from PIL import Image

LOG_FORMAT = "%(asctime)s - %(levelname)s - %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)

session = requests.session()


def run():
    url = "https://beijing.tuitui99.com/tncode.html"
    response = session.get(url)
    logging.info(f"获取验证码结果： {response.content}")
    image = Image.open(io.BytesIO(response.content))
    matrix = numpy.asarray(image)
    x = find_lack_location(matrix)
    check_code(x)


def find_lack_location(image_matrix):
    """
    在验证码图片中寻找
    :param image_matrix:
    :return:
    """
    # 从左往右栅格扫描，寻找第一个不相等的列的x坐标
    for x in range(len(image_matrix[0])):
        # 高度为450px，存储了三张等高图片，则每张图片的高度为150
        for offset in range(0, 150):
            image_1_y = 0 + offset
            image_2_y = 300 + offset
            # 如果发现这一列的像素点有不同的，则认为是滑块出现了
            if ((image_matrix[image_1_y][x] != image_matrix[image_2_y][x]).any()):
                logging.info(f"寻找到缺块所在的列： {x}")
                return x


def check_code(x):
    url = f"https://beijing.tuitui99.com/checkcode.html?tn_r={x}"
    response = session.get(url)
    logging.info(f"提交结果： {response.text}")


if __name__ == "__main__":
    run()
