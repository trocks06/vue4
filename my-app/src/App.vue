<template>
  <nav class="navigation">
    <router-link class="nav-link" to="/">Главная</router-link>
    <button v-if="isAuthenticated" @click="handleLogout" class="logout-btn">Выйти</button>
  </nav>
  <router-view />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'cartItems']),
    cartCount() {
      return this.cartItems.length;
    },
  },
  methods: {
    ...mapActions(['logout']),
    async handleLogout() {
      await this.logout(this.$router);
    },
  },
};
</script>

<style scoped>
#app {
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1a2b44;
}

.navigation {
  padding: 24px 32px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
}

.nav-link {
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.logout-btn {
  padding: 8px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.logout-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.3);
}
</style>