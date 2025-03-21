<template>
  <div class="login">
    <h1>Вход в систему</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
            type="email"
            id="email"
            v-model="credentials.email"
            :class="{ error: errors.email }"
            required
            @input="clearErrors"
        />
        <p v-if="errors.email" class="error-text">{{ errors.email }}</p>
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input
            type="password"
            id="password"
            v-model="credentials.password"
            :class="{ error: errors.password }"
            required
            @input="clearErrors"
        />
        <p v-if="errors.password" class="error-text">{{ errors.password }}</p>
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Вход...' : 'Войти' }}
      </button>
      <router-link to="/register" class="register-link">Регистрация</router-link>
    </form>
    <p v-if="errorMessage" class="error-message" aria-live="polite">{{ errorMessage }}</p>
  </div>
</template>

<script>
import api from '@/utils/api';
import { mapMutations } from 'vuex';

export default {
  name: 'LoginView',
  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
      errors: {},
      errorMessage: '',
      loading: false,
    };
  },
  methods: {
    ...mapMutations(['setToken']),
    clearErrors() {
      this.errors = {};
      this.errorMessage = '';
    },
    async login() {
      this.loading = true;
      try {
        this.errors = {};
        this.errorMessage = '';
        const response = await api.login(this.credentials);
        this.setToken(response.data.data.user_token);
        this.$router.push('/');
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            this.errorMessage = 'Неверный email или пароль';
          } else if (error.response.data?.error?.errors) {
            this.errors = error.response.data.error.errors;
            this.errorMessage = 'Проверьте введенные данные';
          } else {
            this.errorMessage = error.response.data?.error?.message || 'Ошибка сервера';
          }
        } else if (error.request) {
          this.errorMessage = 'Нет соединения с сервером';
        } else {
          this.errorMessage = 'Произошла ошибка';
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 480px;
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
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
}

label {
  display: block;
  color: #4a4a4a;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 8px;
}

input {
  width: 90%;
  padding: 14px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #f8fafc;
  font-size: 16px;
  color: #2d3748;
  transition: all 0.2s ease-in-out;
}

input:focus {
  outline: none;
  border-color: #667eea;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

input.error {
  border-color: #fc8181;
  background: #fff5f5;
}

input.error:focus {
  box-shadow: 0 0 0 3px rgba(252, 129, 129, 0.1);
}

.error-text {
  margin-top: 8px;
  font-size: 14px;
  line-height: 20px;
  color: #e53e3e;
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

button {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
}

button:disabled {
  background: #a0aec0;
  cursor: not-allowed;
  opacity: 0.7;
}

.register-link {
  display: block;
  text-align: center;
  color: #667eea;
  margin-top: 16px;
  text-decoration: none;
  font-size: 15px;
}

.register-link:hover {
  color: #5a67d8;
  text-decoration: underline;
}
</style>