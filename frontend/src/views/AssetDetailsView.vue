<script setup>
import navDrawer from "@/components/base/nav-drawer.vue";
import navBar from "@/components/base/nav-bar.vue";
import { statusColor } from "@/components/utils/functionUtils";
import { ref, onMounted } from "vue";
import apiAssetClient from "@/services/apiAssetClient";

const props = defineProps({
  id: String
})

const asset = ref(null)
const history = ref([])

onMounted( async () =>{
    try{
        const res = await apiAssetClient.getAssetDetails(props.id)
        asset.value = res.data.asset
        history.value = res.data.history
        console.log(res.data);
    }catch(err){
        console.log(err);
    }
})

const taskConfig = {
  Created: { color: 'blue', icon: 'mdi-plus' },
  Assign: { color: 'green', icon: 'mdi-account-arrow-right' },
  Return: { color: 'orange', icon: 'mdi-keyboard-return' },
}

</script>

<template>
    <navDrawer />
    <navBar />
    
    <v-main v-if="asset" class="fill-height">
        <v-container fluid class="fill-height">
            <v-row class="fill-height" align="stretch">
                <v-col cols="8" class="d-flex flex-column fill-height">
                    <v-card class="pa-4">
                        <v-row>
                          <v-col cols="8">
                            <h2> {{ asset.model.name }}</h2>
                            <span class="text-grey">IT num: {{ asset.it_num }}</span>
                          </v-col>
                          <v-col cols="4" class="text-right">
                            <v-chip :color="statusColor(asset.status.name)" 
                            label>
                              {{ asset.status.name }}
                            </v-chip>
                          </v-col>
                        </v-row>

                        <v-divider class="my-4"></v-divider>

                        <v-row >
                          <v-col cols="4">
                            <v-img
                              src="https://placehold.co/600x400"
                              aspect-ratio="1"
                              cover
                              class="rounded-lg"
                            />
                          </v-col>
                          <v-col cols="8">
                            <v-list density="compact">
                              <v-list-item title="Serial Number" :subtitle="asset.serial_num" />
                              <v-list-item title="Category"      :subtitle="asset.model.category.name" />
                              <v-list-item title="Warranty Date" :subtitle="asset.warranty_date" />
                            </v-list>
                          </v-col>
                        </v-row>

                      <v-card variant="tonal" class="pa-3 mt-3">
                        <v-row>
                          <v-avatar size="40">
                            <img :src="asset.user.avatar" />
                          </v-avatar>
                          <div class="ml-3">
                            <div class="text-subtitle-1">{{ asset.user.name }}</div>
                            <div class="text-caption text-grey">Current User</div>
                          </div>

                        </v-row>
                      </v-card>
                    </v-card>
                </v-col>
                <v-col cols="4" class="d-flex flex-column fill-height">
                    <v-card class="flex-grow-1">
                        <v-timeline density="compact" side="end">

                        <v-timeline-item
                          v-for="task in history"
                          :key="task.id"
                          :dot-color="taskConfig[task.type]?.color"
                          :icon="taskConfig[task.type]?.icon"
                        >
                          <div class="d-flex flex-column">
                            
                            <span>
                              <strong>{{ task.type }}</strong>
                                <v-icon v-if="!task.file" icon="mdi-alert-circle-outline" color="red"></v-icon>
                                <v-icon v-else icon="mdi-check-circle-outline" color="green"></v-icon>
                            </span>
                            <span class="text-caption text-grey">
                              {{ new Date(task.created_at).toLocaleDateString() }}
                            </span>

                            <span class="text-caption">
                              Created by: {{ task.assignedBy.name }}<br>
                              Assigned to: {{ task.assignedTo.name }}<br>
                              File: {{ task.file || 'Missing file'}}
                            </span>

                            <span class="text-caption text-grey">
                              <v-chip
                              :color="statusColor(task.status)"
                              :text="task.status"
                              size="x-small">

                              </v-chip>
                            </span>

                          </div>
                        </v-timeline-item>

                      </v-timeline>
                    </v-card>
                </v-col>
            </v-row>
         </v-container>
    </v-main>
</template>