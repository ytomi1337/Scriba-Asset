<script setup>
    import navDrawer from "@/components/base/nav-drawer.vue";
    import navBar from "@/components/base/nav-bar.vue";

    import assetsTable from "@/components/utils/assets-table.vue";
    import tasks from "@/components/utils/tasks-table.vue";
    import assetDiagram from "@/components/utils/asset-diagram.vue";

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

 <v-main>
    <v-container fluid ">

      <v-row >
        <v-col cols="9" class="d-flex flex-column ">
          <v-card class="mb-3">
            <assetsTable  />
          </v-card>

          <v-card >
              <tasks />
          </v-card>
        </v-col>


        <v-col cols="3" class="d-flex flex-column">
          <v-card class="mb-3" >
            <assetDiagram />
          </v-card>

          <v-card >
            <assetDiagram />
          </v-card>

        </v-col>
      </v-row>

    </v-container>
  </v-main>
</template>

