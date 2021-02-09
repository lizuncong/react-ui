import axios from 'axios';
import qs from 'qs';
import { notification } from 'antd';

const { CancelToken } = axios;

class Request {
  constructor() {
    this.urlCancelMap = {}; // 重复请求
  }

  request(method, url, data, useLast, ...rest) {
    const config = Object.assign({
      method,
      url,
      baseURL: '/api',
    }, ...rest);
    if (method === 'get') {
      config.params = data;
    } else if (method === 'post') {
      config.data = data;
    }
    const cancelKey = `${method}/${url}`;
    if (useLast) {
      if (this.urlCancelMap[cancelKey]) {
        this.urlCancelMap[cancelKey](); // 取消上一次的请求
      }
      config.cancelToken = new CancelToken(((c) => {
        this.urlCancelMap[cancelKey] = c;
      }));
    }
    return new Promise((resolve) => {
      axios(config).then((res) => {
        if (res && res.status === 200) {
          resolve(res.data);
        } else {
          // 请求出错
          notification.open({
            message: '返回的状态码不是200',
          });
        }
      }).catch((error) => {
        console.log(`${url}-请求异常`, error);
        if (error.response) {
          notification.open({
            message: `请求异常-response-${error.response.status}`,
          });
        } else if (error.request) {
          console.log(error.request);
          notification.open({
            message: `请求异常-request-${JSON.stringify(error.request)}`,
          });
        } else {
          console.log('Error', error.message);
          notification.open({
            message: `请求异常-${JSON.stringify(error.message)}`,
          });
        }
        console.log(error.config);
      });
    }).finally(() => {
      if (this.urlCancelMap[cancelKey]) {
        this.urlCancelMap[cancelKey] = null;
      }
    });
  }

  get(options) {
    return this.request('get', options.url, options.data, options.useLast);
  }

  post(options) {
    return this.request('post', options.url, options.data, options.useLast);
  }

  // application/x-www-form-urlencoded
  postForm(options) {
    const data = options.data || {};
    const headers = { 'content-type': 'application/x-www-form-urlencoded' };
    return this.request('post', options.url, qs.stringify(data), options.useLast, { headers });
  }

  // multipart/form-data
  upload(options) {
    const data = options.data || {};
    const param = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value instanceof Array) {
        value.forEach((item) => {
          param.append(key, item);
        });
      } else {
        param.append(key, data[key]);
      }
    });
    const headers = { 'content-type': 'multipart/form-data' };
    return this.request('post', options.url, param, options.useLast, { headers });
  }
}

export default new Request();
