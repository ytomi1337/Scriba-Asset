<script setup>
    import navDrawer from "@/components/base/nav-drawer.vue";
    import navBar from "@/components/base/nav-bar.vue";

    import assetsTable from "@/components/utils/assets-table.vue";
    import tasks from "@/components/utils/tasks.vue";

    import { useNotificationStore } from '@/stores/notificationStore'

    const notification = useNotificationStore() 
</script>

<template>
    <navDrawer />
    <navBar />

    <v-snackbar
        v-model="notification.show"
        :timeout="notification.timeout"
        :color="notification.color"
      >
        {{ notification.text }}
    </v-snackbar>

 <v-main class="fill-height">
    <v-container fluid class="fill-height">

      <v-row class="fill-height" align="stretch">

        <!--  LEWA KOLUMNA -->
        <v-col cols="9" class="d-flex flex-column fill-height">


          <v-card class="mb-4 d-flex flex-column">
            <assetsTable  />
          </v-card>


          <v-card class="flex-grow-1 d-flex">
              <tasks />
          </v-card>

        </v-col>

        <!-- PRAWA KOLUMNA -->
        <v-col cols="3" class="d-flex flex-column fill-height">


          <v-card class="flex-grow-1 d-flex mb-4" >
            <div class="empty-state">
              Documents section (coming soon)
            </div>
          </v-card>

          <v-card class="flex-grow-1 d-flex" >
            <div class="empty-state">
              Documents section (coming soon)
            </div>
          </v-card>

        </v-col>

      </v-row>

    </v-container>
  </v-main>
</template>

