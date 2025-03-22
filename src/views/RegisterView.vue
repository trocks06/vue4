<template>
  <div class="register">
    <h1>Регистрация</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label>ФИО:</label>
        <input type="text" v-model="formData.fio" :class="{ error: errors.fio }" required>
        <p v-if="errors.fio">{{ errors.fio[0] }}</p>
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" v-model="formData.email" :class="{ error: errors.email }" required>
        <p v-if="errors.email">{{ errors.email[0] }}</p>
      </div>
      <div class="form-group">
        <label>Пароль:</label>
        <input type="password" v-model="formData.password" :class="{ error: errors.password }" required>
        <p v-if="errors.password">{{ errors.password[0] }}</p>
      </div>
      <button type="submit" :disabled="loading">Зарегистрироваться</button>
    </form>
    <p v-if="successMessage" class="success-message" aria-live="polite">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error-message" aria-live="polite">{{ errorMessage }}</p>
  </div>
</template>

<script>
import api from '@/utils/api';
import { mapMutations } from 'vuex';

export default {
  name: 'RegisterView',
  data() {
    return {
      formData: {
        fio: '',
        email: '',
        password: ''
      },
      errors: {},
      successMessage: '',
      errorMessage: '',
      loading: false
    }
  },
  methods: {
    ...mapMutations(['setToken']),
    async register() {
      this.loading = true;
      try {
        this.errors = {};
        const response = await api.register(this.formData);
        if (response.data.data.user_token) {
          this.setToken(response.data.data.user_token);
          this.successMessage = 'Вы успешно зарегистрировались!';
          setTimeout(() => {
            this.$router.push('/login');
          }, 2000);
        }
      } catch (error) {
        if (error.response && error.response.data.error) {
          const { errors } = error.response.data.error;
          this.errors = errors || {};
          this.errorMessage = 'Ошибка регистрации. Проверьте введенные данные.';
        } else {
          this.errorMessage = 'Произошла ошибка. Попробуйте позже.';
        }
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.register {
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

p {
  margin-top: 8px;
  font-size: 14px;
  line-height: 20px;
}

.success-message {
  color: #38a169;
  background: #f0fff4;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
}

.error-message {
  color: #e53e3e;
  background: #fff5f5;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
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
  transition: all 0.2s ease-in-out;
}

button:disabled {
  background: #a0aec0;
  cursor: not-allowed;
  opacity: 0.7;
}

.login-link {
  display: block;
  text-align: center;
  color: #667eea;
  margin-top: 16px;
  text-decoration: none;
  font-size: 15px;
}

.login-link:hover {
  color: #5a67d8;
  text-decoration: underline;
}
</style>