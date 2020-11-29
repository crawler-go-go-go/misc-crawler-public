const axios = require("axios");
const CryptoJS = require("crypto-js");

const requests = axios.create({
    timeout: 30_000,
    headers: {
        // UA是必要的，否则会返回403
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
    }
});

async function crawl(pageNo, qy_region) {
    const url = `http://jzsc.mohurd.gov.cn/api/webApi/dataservice/query/comp/list?qy_region=${qy_region}&pg=${pageNo}&pgsz=15&total=450`;
    return await requests.get(url)
        .then(async response => {
            return await decryptData(response.data);
        });
}

async function decryptData(data) {
    const key = CryptoJS.enc.Utf8.parse("jo8j9wGw%6HbxfFn");
    const iv = CryptoJS.enc.Utf8.parse("0123456789ABCDEF");
    const t1 = CryptoJS.enc.Hex.parse(data);
    const t2 = CryptoJS.enc.Base64.stringify(t1);
    const t3 = CryptoJS.AES.decrypt(t2, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return t3.toString(CryptoJS.enc.Utf8);
}


(async () => {
    // 北京的第一页
    console.log(await crawl(0, "979796969696"));
})();









