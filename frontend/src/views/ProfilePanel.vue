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
const 

onMounted( async () => {
  try {
    const res = await api.getProfile();
    console.log("✅ Zalogowana pomyslnie");
    user.value = res.data.user
    console.log(res.data);
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
    <itemSlider />
  </v-col>
</v-row>

  <v-row style="height: 50%;" no-gutters>
    <v-col cols="3" class="box">
      <div>DÓŁ 25%</div>
    </v-col>

    <v-col cols="9" class="box">
      <assetDetalis 
      :user="user"/>
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