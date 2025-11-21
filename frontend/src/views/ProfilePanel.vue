<script setup>
import api from "@/services/apiAssetClient";
import navDrawer from "@/components/base/nav-drawer.vue";
import navBar from "@/components/base/nav-bar.vue";
import itemSlider from "@/components/utils/item-slider.vue";
import chipGroup from "@/components/utils/chip-group.vue";
import assetDetalis from "@/components/utils/asset-detalis.vue";
import { useRouter } from "vue-router";
import { ref, onMounted, defineEmits, defineProps} from "vue";

const user =  ref(null);
const router = useRouter();
const asset = ref(null)
const assets = ref([])
const tasks = ref([])

onMounted( async () => {
  try {
    const res = await api.getProfile();
    user.value = res.data.user
    assets.value = res.data.assets
    tasks.value = res.data.tasks
  } catch (err) {
    console.error("❌ Błąd zaczytania danych uytkownika:", err);
  }
});

const handleLogout = async () => {
    try {
        await api.logout();
        router.push('/login')
    }catch(err){
        console.log('Error on Logout attempt', err)
    }
}

const setAssetDetail = async (selectedAsset) => {
  console.log(selectedAsset);
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

    <v-card v-if="user" flat class="d-flex flex-column align-center" style="width: 100%; max-width: 220px;">
      <v-avatar
        rounded="50"
        size="150" >
        <img :src="user.avatar" alt="avatar" width="100%"/>
      </v-avatar>
      <v-card-title>{{ user.name }}</v-card-title>
      <v-card-subtitle>{{ user.position }}</v-card-subtitle>
      <v-card-text>{{ user.email }}</v-card-text>
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