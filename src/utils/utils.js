/*
 * @Description: 公用方法
 * @Author: leitao
 * @Date: 2021-12-06 15:38:02
 * @Last Modified by: leitao
 * @Last Modified time: 2021-12-14 11:41:03
 */
import JsEncrypt from "jsencrypt";
// 密码、手机号加密
export const encryption = (word) => {
  const $mKey =
    "MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAI6hiym1bhZSZxT2DH6CVIPBO2vdPBtN89Eruc/knIFtyHLpeTOkCLUFdJfL2Gibvhu5GI6y0lfuibbMJ0Ie9rOVSC6tuUhMjv6iqYoty68jc9RRai0IPm6XlVtw7KJw40BpqfzcWjKz/YUPV8WcAMx+aTsp2cQ42FkHK1T+KTPxAgMBAAECgYAJJjuzFTxWmjqakZ4Dj4C0YvTY2nw8lCeLx25H87ZGZzBwjqGDuoYEdrEf+6eKLlNnm9wDa10q3tZer4HlL+9LRTaRx8Ma2MyEhAkx3wh/0ILRwT1ribWr8Qqh2bHC4wry0vXC7VSSTAw0fSTebZfrhqPz3DB20p5qyusIf73E8QJBAM372MZb2peugs69l0VmIADLPWa2YU2P7jTxbyUTnKlLEOXP9zMdhZMqq+ToffQL16hZVNSYx9UyyaLP7lbPqBMCQQCxQ6DInsrCT/ZQSR939o7UjahzZkpxSoi+zKr/Y1bXjw8/IItwwe+WUbgzXUf+SK3MmCag/JnL0ok4pT2QULxrAkAqAaMqiI7igfcxHB7eSz5ZixkBek4LmD+W0mm9IOvA5osSor+hz/JumbQmYXdWLpgTP+x50pJmGw5dwpOzZnO7AkBDqydjroqEZvYGbAOhTfP0XCdj9jaQzP0qqQLV/1wVab1OQeQ5JS+K2KNSqFdlUOVX5vVIG2Wykypi/2FjCA8FAkAYYlxzZvICvHbQjP4LF7hliVOUPkpymgIAz1YauYQh26XX08aQ07x8vMDzvaAyYTFDS7n65mssOzHPWcVrxEeB";
  var encrypt = new JsEncrypt();
  encrypt.setPublicKey($mKey);
  var encrypted = encrypt.encrypt(word);
  return encrypted.toString();
};
// 密码校验
export function validatePassword(str) {
  const reg = /^(\w){6,20}$/;
  return reg.test(str);
}
/**
 *  下拉框渲染遍历 转换对象
 * @param {arr} arr 输入的数组 {value:'',label:'' }
 */
export function optionArrToObj(arr = []) {
  const result = {};
  arr.map((item) => {
    if (item.value) {
      result[item.value] = item.label;
    }
  });
  return result;
}
