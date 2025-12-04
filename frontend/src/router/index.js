import { createRouter, createWebHistory } from 'vue-router'
import Profile from '../views/ProfilePanel.vue';
import LoginPanel from '@/views/LoginPanel.vue';
import adminPanel from '@/views/adminPanel.vue';
import api from "@/services/apiAssetClient";
import { useUserStore } from '@/stores/userStore';

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
      path: '/admin',
      name: 'admin-panel',
      component: adminPanel,
      meta: { requiresAuth: true, adminOnly: true}
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPanel,
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  
  if(!userStore.user){
    try{
      await userStore.fetchUser();
    }catch(err){
      console.log('Missing active session');
    }
  }

  if (to.meta.requiresAuth && !userStore.isLogged) {
    return next('/login')
  }

  if(to.meta.adminOnly && !userStore.isAdmin){
    return next('/profile')
  }

  next()
});

export default router
