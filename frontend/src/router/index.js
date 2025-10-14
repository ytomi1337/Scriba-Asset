import { createRouter, createWebHistory } from 'vue-router'
import Profile from '../views/ProfilePanel.vue';
import LoginPanel from '@/views/LoginPanel.vue';
import api from "@/services/apiAssetClient";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPanel,
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      await api.checkAuth();
      next();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        next("/login");
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router
