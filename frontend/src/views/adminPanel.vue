<script setup>
    import navDrawer from "@/components/base/nav-drawer.vue";
    import navBar from "@/components/base/nav-bar.vue";
    import assetsTable from "@/components/utils/assets-table.vue";
    import actions from "@/components/utils/actions.vue";
</script>

<template>
    <navDrawer />
    <navBar />

    <v-main>
        <v-container fluid>

  <v-row>
    <v-col cols="9">
      <v-card>
        <assetsTable />
      </v-card>
    </v-col>

    <v-col cols="3">
      <v-card>
        <actions />
      </v-card>
    </v-col>
  </v-row>

  <v-row >
    <v-col cols="9">
      <h1>documents</h1>
    </v-col>

    <v-col cols="3"></v-col>
  </v-row>

        </v-container>
    </v-main>
</template>

