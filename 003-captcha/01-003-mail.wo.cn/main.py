#!/usr/bin/env python3
# encoding: utf-8
"""
@author: CC11001100
"""

import logging

import requests

LOG_FORMAT = "%(asctime)s - %(levelname)s - %(message)s"
logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)

session = requests.session()


def register(phone_number, passwd):
    # 获取验证码
    response = very_code(phone_number)
    # 提交验证码
    response = check_very_code(response, phone_number)
    # 弹窗也要发请求啊
    h5_callback(phone_number, passwd)
    # 获取手机验证码
    order_meal(phone_number, passwd)


def order_meal(phone_number, passwd):
    url = "https://mail.wo.cn/orderMeal"
    # 注意同一个字段的参数名字与之前的几个接口不同，怪我自己瞎...
    # 难道是不同的人写的，如果是一个人写的哥们也太分裂了吧...
    data = {
        "phone": phone_number,
        "password": passwd,
        "productId": "8888888888"
    }
    response = session.post(url, data=data)
    logging.info(f"获取短信验证码结果： {response.text}")
    return response


def h5_callback(phone_number, passwd):
    url = "https://mail.wo.cn/h5Callback"
    data = {
        "userPhone": phone_number,
        "password": passwd,
        "productID": "8888888888"
    }
    headers = {
        # refer是必须带的
        "Referer": "https://mail.wo.cn/register",
    }
    response = session.post(url, headers=headers, data=data)
    logging.info(f"打开弹窗结果： {response.text}")
    return response


def very_code(phone_number):
    """
    请求验证码
    :param phone_number:
    :return: {'randomCode1': '此', 'randomCode2': '找', 'randomChar': '准背世风字此话离找没'}
    """
    url = "https://mail.wo.cn/veryCode"
    data = {
        "actionType": "veryCode",
        "user": phone_number,
        "domain": "wo.cn"
    }
    response = session.post(url, data=data)
    logging.info(f"请求到验证码： {response.text}")
    return response.json()


def check_very_code(very_code_response, phone_number):
    url = "https://mail.wo.cn/checkVeryCode"
    data = {
        "actionType": "checkVeryCode",
        "user": phone_number,
        "userCode": very_code_response["randomCode1"] + very_code_response["randomCode2"]
    }
    response = session.post(url, data=data)
    logging.info(f"提交验证码的结果： {response.text}")
    return response


if __name__ == "__main__":
    register("13791488888", "cC11001100")
