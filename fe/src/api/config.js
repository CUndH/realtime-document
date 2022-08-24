import axios from 'axios';

const http = axios.create({
  baseURL: '/api', // api base_url
  timeout: 10000, // 请求超时时间
});

function requestInterceptor(config) {
  return config;
}

function requestErrorInterceptor(error) {
  return Promise.reject(error);
}

async function responseInterceptor(response) {
  // eslint-disable-next-line prefer-const
  let { data } = response;
  const { success } = data;
  if (success) {
    return data;
  }
  return Promise.reject(data);
}

function responseErrorInterceptor(error) {
  if (axios.isCancel(error)) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ message: 'cancel request' });
  }
  if (error.isAxiosError) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ ...error, errMessage: error.message });
  }
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({ ...error, errMessage: '服务异常，请稍后尝试！' });
}

http.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
http.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default http;
