<script setup>
    import navDrawer from "@/components/layout/NavDrawer.vue";
    import navBar from "@/components/layout/NavBar.vue";

    import assetsTable from "@/components/tables/AssetsTable.vue";
    import tasks from "@/components/tables/TasksTable.vue";
    import assetDiagram from "@/components/base/AssetDiagram.vue";

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

