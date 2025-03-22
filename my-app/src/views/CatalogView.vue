<template>
  <div class="catalog">
    <h1>Каталог товаров</h1>
    <div class="product-list" v-if="products.length">
      <div class="product" v-for="product in products" :key="product.id">
        <img :src="getImageUrl(product.image)" :alt="product.name" class="product-image">
        <h2>{{ product.name }}</h2>
        <p class="description">{{ product.description }}</p>
        <p class="price">Цена: {{ formatPrice(product.price) }} руб.</p>
        <button>Добавить в корзину</button>
      </div>
    </div>
    <p v-else-if="errorMessage" class="error-message" aria-live="polite">{{ errorMessage }}</p>
    <p v-else class="loading-message">Загрузка товаров...</p>
  </div>
</template>

<script>
import api from '@/utils/api';
import { mapActions } from 'vuex';

export default {
  name: 'CatalogVue',
  data() {
    return {
      products: [],
      loading: false,
      errorMessage: '',
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      this.loading = true;
      this.errorMessage = '';
      try {
        const response = await api.getProducts();
        this.products = response.data.data;
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Ошибка при загрузке товаров';
      } finally {
        this.loading = false;
      }
    },
    getImageUrl(relativePath) {
      return `http://lifestealer86.ru/${relativePath}`;
    },
    formatPrice(price) {
      return Number(price).toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
  },
};
</script>

<style scoped>
.catalog {
  max-width: 1500px;
  margin: 32px auto;
  padding: 32px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #1a1a1a;
  font-size: 28px;
  margin-bottom: 32px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  gap: 20px;
}

.product {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 500px;
  padding: 20px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 6px;
  margin-bottom: 16px;
}

h2 {
  color: #2d3748;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
  min-height: 48px;
}

.description {
  color: #4a4a4a;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 12px;
  flex-grow: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.price {
  color: #2d3748;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}

button {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #5a67d8 0%, #6b4691 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-top: auto;
}

button:disabled {
  background: #a0aec0;
  cursor: not-allowed;
  opacity: 0.7;
}

.error-message {
  color: #e53e3e;
  background: #fff5f5;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
}

.loading-message {
  text-align: center;
  color: #4a4a4a;
  font-size: 16px;
  margin-top: 24px;
}
</style>