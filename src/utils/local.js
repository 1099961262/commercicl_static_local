/*
 * @Description: 封装本地存储
 * @Author: leitao
 * @Date: 2021-12-06 15:37:47
 * @Last Modified by: leitao
 * @Last Modified time: 2021-12-06 15:37:47
 */

export default {
  get(key) {
    return JSON.parse(sessionStorage.getItem(key));
  },
  set(key, val) {
    sessionStorage.setItem(key, JSON.stringify(val));
  },
  remove(key) {
    sessionStorage.removeItem(key);
  },
  clear() {
    sessionStorage.clear();
  },
};
