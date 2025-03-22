import { createStore } from 'vuex';
import api from '@/utils/api';

export default createStore({
  state: {
    token: localStorage.getItem('user_token') || null,
    products: [],
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    products: (state) => state.products,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('user_token', token);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('user_token');
    },
    setProducts(state, products) {
      state.products = products;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await api.login(credentials);
      commit('setToken', response.data.data.user_token);
      return response;
    },
    async logout({ commit }, router) {
      commit('clearToken');
      await router.push('/login');
    },
    async fetchProducts({ commit }) {
      const response = await api.getProducts();
      commit('setProducts', response.data);
      return response;
    },
  },
});