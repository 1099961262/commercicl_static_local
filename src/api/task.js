/*
 * @Description: 任务相关接口
 * @Author: leitao
 * @Date: 2021-12-06 15:36:56
 * @Last Modified by: leitao
 * @Last Modified time: 2021-12-07 13:54:25
 */
import req from "../utils/request";

// 任务列表查询
export async function selectTaskInfoList(data) {
  return req.request("/auth/taskInfo/selectTaskInfoList", { data }, "post");
}
//任务中止
export async function stopTask(data) {
  return req.request("/auth/taskInfo/stopTask", { data }, "post");
}

//任务删除
export async function deleteTask(params) {
  return req.request("/auth/taskInfo/delete", { params }, "GET");
}
