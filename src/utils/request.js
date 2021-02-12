import axios from 'axios';
import qs from 'qs';
import { notification } from 'antd';
import { showDomLoading, removeDomLoading } from './createOverlayByDom';

const { CancelToken } = axios;

class Request {
  constructor() {
    this.urlCancelMap = {}; // 重复请求
    this.urlLoadingMap = {}; // dom loading次数
  }

  // loadingDOM 需要加loading效果的dom id。
  // useLast为true时，如果短时间内发起多次请求，则以最后一次结果为准
  request(method, url, data, useLast, loadingDOM, ...rest) {
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
    const mapKey = `${method}/${url}`;
    // 配置了取消重复请求
    if (useLast) {
      if (this.urlCancelMap[mapKey]) {
        this.urlCancelMap[mapKey](); // 取消上一次的请求
      }
      config.cancelToken = new CancelToken(((c) => {
        this.urlCancelMap[mapKey] = c;
      }));
    }
    // 如果设置了loadingDOM，则需要加loading
    // 这里需要防止短时间内发起大量请求的情况，这种情况只需要加一次loading
    if (loadingDOM) {
      if (!this.urlLoadingMap[loadingDOM]) {
        showDomLoading(loadingDOM);
      }
      this.urlLoadingMap[loadingDOM] = (this.urlLoadingMap[loadingDOM] || 0) + 1;
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
      if (this.urlCancelMap[mapKey]) {
        this.urlCancelMap[mapKey] = null;
      }
      if (this.urlLoadingMap[loadingDOM]) {
        this.urlLoadingMap[loadingDOM] = this.urlLoadingMap[loadingDOM] - 1;
        if (!this.urlLoadingMap[loadingDOM]) {
          removeDomLoading(loadingDOM);
        }
      }
    });
  }

  get(options) {
    return this.request('get', options.url, options.data, options.useLast, options.loadingDOM);
  }

  post(options) {
    return this.request('post', options.url, options.data, options.useLast, options.loadingDOM);
  }

  // application/x-www-form-urlencoded
  postForm(options) {
    const data = options.data || {};
    const headers = { 'content-type': 'application/x-www-form-urlencoded' };
    return this.request('post', options.url, qs.stringify(data), options.useLast, options.loadingDOM, { headers });
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
    return this.request('post', options.url, param, options.useLast, options.loadingDOM, { headers });
  }
}

export default new Request();
