import axios from 'axios';
import qs from 'qs';
import { notification } from 'antd';

class Request {
  request(method, url, data, ...rest) {
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
    });
  }

  get(options) {
    return this.request('get', options.url, options.data);
  }

  post(options) {
    return this.request('post', options.url, options.data);
  }

  // application/x-www-form-urlencoded
  postForm(options) {
    const data = options.data || {};
    const headers = { 'content-type': 'application/x-www-form-urlencoded' };
    return this.request('post', options.url, qs.stringify(data), { headers });
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
    return this.request('post', options.url, param, { headers });
  }
}

export default new Request();
