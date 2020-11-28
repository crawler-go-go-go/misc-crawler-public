const CryptoJS = require("crypto-js");

const passwd = "ccIs0KccIs0K";

const key = CryptoJS.enc.Utf8.parse("20161216");
const t2 = CryptoJS.DES.encrypt(passwd, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
});
const result = t2.ciphertext.toString();

console.log(result);  // f63d9ba17a63782b46bec0330c7110e1

