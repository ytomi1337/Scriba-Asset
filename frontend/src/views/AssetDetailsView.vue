<script setup>
import navDrawer from "@/components/base/nav-drawer.vue";
import navBar from "@/components/base/nav-bar.vue";
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

</script>

<template>
    <navDrawer />
    <navBar />
    
    <v-main>
        <v-container fluid >
            <v-row>
                <v-col cols="8">
                    <v-card>
                        <pre>{{ asset }}</pre>
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <v-card>
                        <pre>{{ history }}</pre>
                    </v-card>
                </v-col>
            </v-row>
         </v-container>
    </v-main>
</template>