<script setup>

  import notificationDropdown from './NotificationDropdown.vue'
  import { useUserStore } from '@/stores/userStore';
  import Actions from './ActionDropdown.vue';

  const userStore = useUserStore()

  const handleLogout = async () => {
    try{
      window.location.href = '/login'
      await userStore.logout()
    }catch(err){
      console.error('Logout error:', err)
    }
  }

</script>

<template>
  <v-app-bar height="64" class="topbar">

      <div class="org-wrap ml-10" v-if="userStore.user">
        <div class="org-small">Your Organization</div>
        <div class="org-name">{{ userStore.user.localization.name }}</div>
      </div>

    <v-spacer />

   
    <Actions />
    <notificationDropdown />
    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn v-bind="props" v-if="userStore.user" variant="text" class="user-btn" >
          <v-avatar size="36" class="mr-5">
            <img :src="userStore.user.avatar" alt="avatar" width="100%" />
          </v-avatar>
          <span class="user-name">{{ userStore.user.name }}</span>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <!-- <v-list-item >Profile</v-list-item> -->
        <v-list-item @click="handleLogout" prepend-icon="mdi-logout">Logout</v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<style scoped>
.org-wrap {
  display:flex;
  flex-direction:column;
  gap:2px;
}
.org-small { font-size: 12px; color: #667085; }
.org-name { font-weight:600; font-size:14px; }
</style>