import axios from 'axios';
import qs from 'qs';

// 根据环境变量区分接口的默认地址
switch (process.env.Node_ENV) {
  case 'production':
    axios.defaults.baseURL = 'http://api.production.cn';
    break;
  case 'test':
    axios.defaults.baseURL = 'http://api.test.cn';
    break;
  default:
    axios.defaults.baseURL = 'http://api.dev.cn';
}

// 设置超时时间和跨域是否允许携带凭证
axios.defaults.timeout = 10000; // 超时时间10秒
axios.defaults.withCredentials = true;

/**
 * 设置请求传递数据的格式
 * x-www-form-urlencoded
 * */
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.transformRequest = (data) => qs.stringify(data);

// 自定义响应成功的HTTP状态码，默认情况下状态码2开头的才是请求成功
axios.defaults.validateStatus = (status) => /^(2|3)\d{2}$/.test(status);

/**
 * 设置请求拦截器
 * */
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }

  return config;
}, (error) => Promise.reject(error));

/**
 * 设置响应拦截器，请求成功或失败与axios.defaults.validateStatus配置有关
 * */
axios.interceptors.response.use((response) =>
  // 请求状态码以2或者3开头的，就是请求成功，走这个回调
  response.data,
(error) => {
  // 请求状态码不是2也不是3开头的，就是请求失败，走这个回调
  const { response } = error;
  if (response) {
    switch (response.status) {
      case 401: // 权限
        break;
      case 403: // 一般token过期
        break;
      case 404: // 找不到页面
        break;
      default:
        console.log('ohuo');
    }
  } else if (!window.navigator.onLine) {
    // 跳转到断网页面
  } else {
    return Promise.reject(error);
  }
});

export default axios;
