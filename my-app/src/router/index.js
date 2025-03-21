import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const routes = [
    { path: '/', name: 'Catalog', component: () => import('@/views/CatalogView.vue') },
    { path: '/login', name: 'Login', component: () => import('@/views/LoginView.vue') },
    { path: '/register', name: 'Register', component: () => import('@/views/RegisterView.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated;
    const publicPages = ['Login', 'Register'];
    const authRequired = !publicPages.includes(to.name);

    if (authRequired && !isAuthenticated) {
        return next({ name: 'Login' });
    }

    if (!authRequired && isAuthenticated) {
        return next({ name: 'Catalog' });
    }

    next();
});

export default router;