<script setup>
import assetService from "@/services/api/asset-service";
import navDrawer from "@/components/layout/NavDrawer.vue";
import navBar from "@/components/layout/NavBar.vue";
import itemSlider from "@/components/base/ItemSlider.vue";
import assetDetalis from "@/components/base/AssetDetails.vue";
import userTasks from "@/components/base/UserTasksList.vue";
import { ref, onMounted, computed} from "vue";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore()

const asset = ref(null)
const assets = ref([])
const loading = ref(false)

const isEmptyAssets = computed(() => assets.value.length === 0);

onMounted( async () => {
  loading.value = true
  try {
    const res = await assetService.getUserAssets(userStore.user.id);
    assets.value = res.data
  } catch (err) {
    console.error("Error during fetching user assets:", err);
  }finally{
    loading.value = false
  }
});


const setAssetDetail = async (selectedAsset) => {
  asset.value = selectedAsset
}

</script>

<template>

    <navDrawer />
    <navBar />

    <v-main class="fill-height">
      <v-container fluid class="fill-height">
         <v-row class="fill-height" align="stretch">
        
        <!-- 🔹 LEWA KOLUMNA -->
        <v-col cols="3" class="d-flex flex-column fill-height">
          <v-card
            v-if="userStore.user"
            class="mb-4 d-flex flex-column align-center pa-4"
          >
            <v-avatar size="120">
              <img :src="userStore.user.avatar" width="100%" />
            </v-avatar>

            <v-card-title>{{ userStore.user.name }}</v-card-title>
            <v-card-subtitle>{{ userStore.user.position }}</v-card-subtitle>
            <v-card-text>{{ userStore.user.email }}</v-card-text>
          </v-card>

          <!-- 📋 TASKS -->
          <v-card class="flex-grow-1 d-flex">
            <template v-if="loading">
              <div class="empty-state">Loading tasks...</div>
            </template>

            <template v-else>
              <userTasks />
            </template>
          </v-card>

        </v-col>

        <!-- 🔹 PRAWA KOLUMNA -->
        <v-col cols="9" class="d-flex flex-column fill-height">


          <v-card class="mb-4 pa-2">
            <template v-if="loading">
              <div class="empty-state">Loading assets...</div>
            </template>

            <template v-else-if="isEmptyAssets">
              <div class="empty-state">No assets yet </div>
            </template>

            <template v-else>
              <itemSlider
                :assets="assets"
                @send-asset-detail="setAssetDetail"
              />
            </template>
          </v-card>


          <v-card class="flex-grow-1 d-flex">
            <template v-if="isEmptyAssets">
              <div class="empty-state">No assetes yet</div>
            </template>

            <template v-else-if="!asset">
              <div class="empty-state">Select an asset to see details</div>
            </template>

      

            <template v-else>
              <assetDetalis :asset="asset" />
            </template>
          </v-card>

        </v-col>

      </v-row>
      </v-container>
    </v-main>
</template>

<style>
.empty-state {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 14px;
  text-align: center;
  padding: 20px;
}

</style>
