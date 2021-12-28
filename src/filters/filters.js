/*
 * @Description: 过滤器
 * @Author: leitao
 * @Date: 2021-12-14 11:37:42
 * @Last Modified by: leitao
 * @Last Modified time: 2021-12-14 11:48:44
 */

import { optionArrToObj } from "@utils/utils.js";
import { taskStatusOptions } from "./enumerate";

// 账目类型
export function taskStatus(data) {
  const status = optionArrToObj(taskStatusOptions);
  return data ? status[data] : "-";
}
