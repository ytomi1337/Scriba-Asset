<script setup>
import api from "@/services/apiAssetClient";
import navDrawer from "@/components/base/nav-drawer.vue";
import navBar from "@/components/base/nav-bar.vue";
import itemSlider from "@/components/utils/item-slider.vue";
import chipGroup from "@/components/utils/chip-group.vue";
import assetDetalis from "@/components/utils/asset-detalis.vue";
import { useRouter } from "vue-router";
import { ref, onMounted, defineEmits, defineProps} from "vue";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore()

const asset = ref(null)
const assets = ref([])

onMounted( async () => {
  try {
    const res = await api.getUserAssets(userStore.user.id);
    assets.value = res.data
  } catch (err) {
    console.error("❌ Błąd zaczytania danych uytkownika:", err);
  }
});


const setAssetDetail = async (selectedAsset) => {
  asset.value = selectedAsset
}

</script>

<template>

    <navDrawer />
    <navBar />
    <v-main >
<v-container fluid class="pa-0 ma-8 bg-surface" style="height: calc(100vh - 110px);">
  
  <v-row style="height: 50%;" no-gutters>
  <v-col cols="3" class="d-flex align-center justify-center bg-surface box">

    <v-card v-if="userStore.user" flat class="d-flex flex-column align-center" style="width: 100%; max-width: 220px;">
      <v-avatar
        rounded="50"
        size="150" >
        <img :src="userStore.user.avatar" alt="avatar" width="100%"/>
      </v-avatar>
      <v-card-title>{{ userStore.user.name }}</v-card-title>
      <v-card-subtitle>{{ userStore.user.position }}</v-card-subtitle>
      <v-card-text>{{ userStore.user.email }}</v-card-text>
    </v-card>

  </v-col>

  <v-col cols="9" class="box bg-surface">
    <chipGroup />
    <itemSlider 
      :assets="assets"
      @send-asset-detail="setAssetDetail"
      />
  </v-col>
</v-row>

  <v-row style="height: 50%;" no-gutters>
    <v-col cols="3" class="box">
      <h1> documents</h1>
    </v-col>

    <v-col cols="9" class="box">
      <assetDetalis 
      :asset="asset"/>
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