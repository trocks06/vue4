import { createStore } from 'vuex';
import api from '@/utils/api';

export default createStore({
  state: {
    token: localStorage.getItem('user_token') || null,
    cartItems: [],
    products: [],
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    cartItems: (state) => state.cartItems,
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
    addToCart(state, productId) {
      state.cartItems = [...state.cartItems, productId];
    },
    removeFromCart(state, productId) {
      state.cartItems = state.cartItems.filter(id => id !== productId);
    },
    setProducts(state, products) {
      state.products = products;
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await api.login(credentials);
      commit('setToken', response.data.data.user_token);
      return response;
    },
    async logout({ commit }, router) {
      commit('clearCart');
      commit('clearToken');
      await router.push('/login');
    },
    async fetchProducts({ commit }) {
      const response = await api.getProducts();
      commit('setProducts', response.data);
      return response;
    },
    addToCart({ commit }, productId) {
      commit('addToCart', productId);
    },
    removeFromCart({ commit }, productId) {
      commit('removeFromCart', productId);
    },
  },
});