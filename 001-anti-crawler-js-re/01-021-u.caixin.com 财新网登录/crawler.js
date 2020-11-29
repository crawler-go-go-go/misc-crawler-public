const axios = require("axios");
const CryptoJS = require("crypto-js");

const requests = axios.create({
    timeout: 30_000,
    // headers: {
    //     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
    // }
});

async function login(username, passwd) {
    const encryptedPasswd = encodeURIComponent(await encryptPasswd(passwd));
    const url = `https://gateway.caixin.com/api/ucenter/user/v1/loginJsonp?account=${username}&password=${encryptedPasswd}&deviceType=5&unit=1&areaCode=%2B86&callback=__caixincallback1606033966061`;
    console.log(url);
    return await requests.get(url)
        .then(async response => {
            return response.data;
        });
}

async function encryptPasswd(passwd) {
    const key = CryptoJS.enc.Utf8.parse("G3JH98Y8MY9GWKWG");
    const t1 = CryptoJS.enc.Utf8.parse(passwd);
    const t2 = CryptoJS.AES.encrypt(t1, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return t2.toString();
}


(async () => {
    // 接码平台随便注册的一个账号，用于测试正确的账号密码是否能正常登陆
    // /**/__caixincallback1606033966061({"code":0,"msg":"登录成功","data":{"uid":"10339939","code":"34...53","deviceType":"5","unit":"1","avatar":"https://getavatar.caixin.com/010/33/99/39_real_avatar_middle.jpg","gender":"0","bio":"","resideprovince":"","residecity":"","nationality":"","birthyear":"0","birthmonth":"0","birthday":"0","occupation":"","emailbind":"0","mobile":"16534084800","areaCode":"+86","mobilebind":"1","nickname":"财新网友wkztvY","hasPassword":"1","extend":{},"comeFrom":6,"newUser":false,"title":"","image":"","selfEmail":"","authType":"财新网","userAuth":"da77ogGlRIch2jbTgN2LppC+P/Ln6yw0bcJglcVp0BOoNHdSRmI4zAQxnSDbmhmFlT4S+jVvE825hqgXWsOKLYYZXsIRvDoAtw9M+GUAqXJgPXlbAqa1ZdtKKDlx3fdhTL8","businessId":"1001","birthprovince":"","birthcity":""}});
    console.log(await login("16534084800", "ccIs0KccIs0K"))
})();









