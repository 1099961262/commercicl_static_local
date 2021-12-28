/*
 * @Description: 用户相关接口
 * @sightor: leitao
 * @Date: 2021-12-06 15:36:44
 * @Last Modified by: leitao
 * @Last Modified time: 2021-12-07 13:54:24
 */
import req from "../utils/request";

// 登录
export async function doLogin(data) {
  return req.request("/auth/doLogin", { data }, "post");
}
//登录验证码接口
export async function verifyCode(params) {
  return req.request("/auth/login/verifyCode", { params }, "get");
}
//退出
export async function loginOut(params) {
  return req.request("/auth/login/timeOut", { params }, "get");
}
//修改密码
export async function updatePwd(data) {
  return req.request("/auth/user/updatePwd", { data }, "post");
}

//日志中心
export async function selectLogList(params) {
  return req.request("/auth/log/selectLogListById", { params }, "get");
}
//登录日志
export async function selectLogDetailList(params) {
  return req.request("/auth/log/selectLogDetailById", { params }, "get");
}
