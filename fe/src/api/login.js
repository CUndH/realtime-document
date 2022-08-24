import http from '@/api/config';

class LoginApi {
  static login(data) {
    return http.post('/user/login', data);
  }

  static getUserInfo(params) {
    return http.get('/user/info', {
      params,
    });
  }
}

export default LoginApi;
