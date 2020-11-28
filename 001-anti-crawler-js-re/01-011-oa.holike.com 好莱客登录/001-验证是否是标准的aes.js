const CryptoJS = require("crypto-js");

const passwd = "cc11001100";

const key = CryptoJS.enc.Utf8.parse("E31D139DEF5142C4");
const iv = CryptoJS.enc.Utf8.parse("A42265ECFBF93722");
const t2 = CryptoJS.AES.encrypt(passwd, key, {
    iv
});
const result = "䐵匠䴵" + t2.toString();

console.log(result); // 䐵匠䴵ePTN5sce+ecPfs08wFBjiQ==

