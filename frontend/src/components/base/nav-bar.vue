<script setup>
  import api from '@/services/apiAssetClient';
  import { ref, onMounted } from 'vue';
  import notificationDropdown from '../utils/notification-dropdown.vue';
  import { useUserStore } from '@/stores/userStore';

  const userStore = useUserStore()

  const user = ref(null)

</script>

<template>
  <v-app-bar   height="64" class="topbar">

      <div class="org-wrap ml-10" v-if="userStore.user">
        <div class="org-small">Your Organization</div>
        <div class="org-name">{{ userStore.user.localization.name }}</div>
      </div>

    <v-spacer />

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
        <v-list-item >Profile</v-list-item>
        <v-list-item >Logout</v-list-item>
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