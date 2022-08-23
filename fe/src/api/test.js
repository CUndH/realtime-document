import http from '@/api/config';

class TestApi {
  static getTest(params) {
    return http.get('/test', {
      params,
    });
  }
}

export default TestApi;
