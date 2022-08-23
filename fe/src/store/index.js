import LoginApi from '@/api/login';
import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {},
  },
  getters: {
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = {};
    },
  },
  actions: {
    getAuth({ commit, state }) {
      if (JSON.stringify(state.user) === '{}') {
        return LoginApi.getUserInfo().then((res) => {
          if (res.success) {
            commit('SET_USER', res.data);
          }
        });
      }
      return Promise.resolve();
    },
  },
  modules: {
  },
});
