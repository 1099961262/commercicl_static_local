/*
 * @Description: 存放数据仓库中一些公用方法
 * @Author: leitao
 * @Date: 2021-12-06 15:13:11
 * @Last Modified by: leitao
 * @Last Modified time: 2021-12-06 15:13:11
 */

/**
 * 更新table列表中的数据 视图的无刷更新 更新整行数据
 * @param {Array} oldList 原数据
 * @param {object} updataObj 需要更新的数据
 * @param {string} idkey id匹配的字段
 */
export function updataList(oldList = [], updataObj, idkey) {
  oldList.map((item, index) => {
    if (item[idkey] === updataObj[idkey]) {
      oldList[index] = updataObj;
    }
  });
  return JSON.parse(JSON.stringify(oldList));
}

export function updataListObj(oldList = [], updataObj, idkey) {
  oldList.map((item, index) => {
    if (JSON.stringify(item[idkey]) === JSON.stringify(updataObj[idkey])) {
      oldList[index] = updataObj;
    }
  });
  return JSON.parse(JSON.stringify(oldList));
}
/**
 * 更新table列表中的数据 视图的无刷更新 只更新状态status
 * @param {Array} oldList 原数据
 * @param {object} updataObj 需要更新的数据
 * @param {string} idkey id匹配的字段
 */
export function updataStatus(
  oldList = [],
  updataObj = { id: "", status: "" },
  idkey
) {
  oldList.map((item) => {
    if (item[idkey] === updataObj.id) {
      item.status = updataObj.status;
    }
  });
  return JSON.parse(JSON.stringify(oldList));
}
