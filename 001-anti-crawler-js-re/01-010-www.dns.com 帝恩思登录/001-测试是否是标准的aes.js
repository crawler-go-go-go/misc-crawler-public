const CryptoJS = require("crypto-js");

const passwd = "cc11001100";

const key = CryptoJS.enc.Utf8.parse("1234567890abcDEF");
const iv = CryptoJS.enc.Utf8.parse("1234567890abcDEF");
const t2 = CryptoJS.AES.encrypt(passwd, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
});

console.log(t2.toString()); // iXGPKkMe6Zfh4DtAqSCEBA==

