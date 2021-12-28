/*
 * @Description: 封装请求
 * @Author: leitao
 * @Date: 2021-12-06 15:37:52
 * @Last Modified by: leitao
 * @Last Modified time: 2021-12-15 17:35:46
 */
import axios from "axios";
// 引入提示框
import { Message } from "element-ui";
// //引入本地存储函数
import local from "@utils/local.js";
import router from "../router/index.js";

axios.defaults.withCredentials = true;
if (process.env.NODE_ENV == "production") {
  axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
}
// 设置超时时间
axios.defaults.timeout = 10000;
// 设置默认post的请求头
axios.defaults.headers.post["Content-Type"] = "application/json";
// 请求拦截器
// 接口鉴权
axios.interceptors.request.use((config) => {
  // let userInfo = local.get("userInfo") || "";
  // let token;
  // if (userInfo) {
  //   token = local.get("userInfo").token || "";
  //   if (token) config.headers.Authorization = token; //token挂载请求头 Authorization字段上
  // }
  //判断token，存在就挂载在请求头

  return config;
});

//响应拦截器
axios.interceptors.response.use(
  (response) => {
    //如果后端数据包含 code 和message两个字段
    if (
      response.data.code !== undefined &&
      response.data.message !== undefined
    ) {
      let { code, message } = response.data;
      if (code === "000000") {
        // Message({ type: "success", message });
      } else {
        Message({
          message: message,
          type: "error",
        });
        // if (code === "10" || code === "4000" || code === "2") {
        //   router.push("/login");
        // }
      }
    }
    return response;
  },
  (err) => {
    // 如果请求错误
    let status;
    if (err.response) {
      status = err.response.status;
    }
    if (status === undefined || status === "undefined") {
      status = 401;
    }
    switch (status) {
      case 400:
        err.message = "请求错误";
        break;
      case 401:
        err.message = "未授权，请登录";
        break;
      case 403:
        err.message = "拒绝访问";
        break;
      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`;
        break;
      case 408:
        err.message = "请求超时";
        break;
      case 500:
        err.message = "服务器内部错误";
        break;
      case 501:
        err.message = "服务未实现";
        break;
      case 502:
        err.message = "网关错误";
        break;
      case 503:
        err.message = "服务不可用";
        break;
      case 504:
        err.message = "网关超时";
        break;
      case 505:
        err.message = "HTTP版本不受支持";
        break;
      default:
        break;
    }
    Message({
      message: err.message,
      type: "error",
    });

    if (status === 401) {
      local.clear();
      router.push("/login");
    }
    // return Promise.reject(err);
    return Promise.resolve(err);
  }
);

function request(url, data = {}, method = "get") {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      ...data,
    })
      .then((res) => {
        //成功
        resolve(res.data);
      })
      .catch((res) => {
        //失败
        reject(res);
      });
  });
}

export default {
  request: request,
};
