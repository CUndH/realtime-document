import http from '@/api/config';

class LoginApi {
  static login(params) {
    return http.get('/login', {
      params,
    });
  }

  static getUserInfo(params) {
    return http.get('/login', {
      params,
    });
  }
}

export default LoginApi;
