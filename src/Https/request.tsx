import axios, { AxiosRequestConfig } from "axios";
import { PendingType } from "./type";
import { clearSession, getSession, removeSession } from "@/utils/base";
// 取消重复请求
const pending: Array<PendingType> = [];
const CancelToken = axios.CancelToken;

// axios 实例
const instance = axios.create({
  timeout: 10000,
  responseType: "json",
});

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: number = +key;
    const list: PendingType = pending[key];
    // 当前请求在数组中存在时执行函数体
    if (
      list.url === config.url &&
      list.method === config.method &&
      JSON.stringify(list.params) === JSON.stringify(config.params) &&
      JSON.stringify(list.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      list.cancel("操作太频繁，请稍后再试");
      // 从数组中移除记录
      pending.splice(item, 1);
    }
  }
};

// 添加请求拦截器
instance.interceptors.request.use(
  (request: any) => {
    // removePending(request);
    request.cancelToken = new CancelToken((c) => {
      pending.push({
        url: request.url,
        method: request.method,
        params: request.params,
        data: request.data,
        cancel: c,
      });
    });
    request.headers.token = getSession("token");
    return request;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
// 添加响应拦截器
instance.interceptors.response.use(
  (response: any) => {
    if (response.data.code === 401) {
      return (()=>{
        clearSession()
        window.location.reload()
      })();
    }
    // removePending(response.config);
    return response;
  },
  (error: any) => {
    const response = error.response;
    return Promise.reject(response || { message: error.message });
  }
);

export default instance;
