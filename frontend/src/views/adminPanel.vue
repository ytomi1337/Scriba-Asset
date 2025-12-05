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
        <v-container fluid class="pa-0 ma-8 bg-surface" style="height: calc(100vh - 110px);">

            <v-row style="height: 50%;" no-gutters>
                <v-col cols="9" class="box">
                    <assetsTable />
                </v-col>

                <v-col cols="3" class="box">
                    <actions />
                </v-col>
            </v-row>

            <v-row style="height: 50%;" no-gutters>
                <v-col cols="9" class="box">
                    <h1> documents</h1>
                </v-col>

                <v-col cols="3" class="box">

                </v-col>
            </v-row>

        </v-container>

    </v-main>
</template>

<style scoped>
.box{
  padding: 16px;
  height: 100%;
  border: 1px solid #dcd5d523;
}
</style>