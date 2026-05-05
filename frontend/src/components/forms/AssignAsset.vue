<script setup>
    import { ref, onMounted } from 'vue';
    import apiAssetClient from '@/services/apiAssetClient';

    import { useDircetoryStore } from '@/stores/directoryStore';
    import { useNotificationStore } from '@/stores/notificationStore';
    import { useTaskStore } from '@/stores/taskStore';
    import { useAssetStore } from '@/stores/assetStore';

    const directoryStore = useDircetoryStore()
    const notificationStore = useNotificationStore()
    const assetStore = useAssetStore()
    const taskStore = useTaskStore()

    const emit = defineEmits(['close'])

    const headers = [
        { title: 'ID', key: 'it_num' },
        { title: 'SN', key: 'serial_num', sortable: false,},
        { title: 'Model', key: 'model.name', sortable: false, },      
        { title: 'Category', key: 'model.category.name', sortable: false, } 
    ]
    const assets = ref([])
    const search = ref('')
    const selectedUser = ref(null)
    const selectedAssets = ref([])

    onMounted( async () => {
        directoryStore.fetch('users');

        try{
            const res = await apiAssetClient.getStock();
            assets.value = res.data

        }catch (err) {
            console.error("❌ Error during loading availbe assets:", err);
        }
    })

    const submitAssign = async() => {
        try{
            const payload = {
                user: selectedUser.value,
                assets: selectedAssets.value.map(a => a.id)
            }

            await apiAssetClient.assignAsset(payload)
            
            assetStore.refreshAssets()

            notificationStore.success(`Asset Assigned correctly`)
            emit('close')
        }catch(err){
            console.log(err);
        }
    }

    const handleCancel = () => {
            emit('close')   
    }
</script>

<template>
    <v-card class="pa-4">
        <v-card-title class="font-weight-bold">
         Assign Device
        </v-card-title>

        <v-card-subtitle class="mb-4">
          Select a user and assign one or more assets.
        </v-card-subtitle>

        <v-divider class="mb-4" />

        <v-form @submit.prevent="submitAssign">
            <v-row>
                <v-col cols="12">
                    <v-autocomplete
                    :items="directoryStore.users"
                    item-title="name"
                    item-value="id"
                    label="Select User"
                    v-model="selectedUser"
                    clearable
                    no-data-text="No users found"
                    />
                </v-col>

                <v-col cols="12">
                    <v-text-field
                    v-model="search"
                    label="Search assets"
                    append-inner-icon="mdi-magnify"

                    clearable
                    />
                </v-col>

                <v-col cols="12">
                    <v-card variant="flat">
                        <v-data-table
                        :headers="headers"
                        :items="assets"
                        v-model="selectedAssets"
                        return-object
                        show-select
                        item-value="id"
                        :search="search"
                        height="300"
                        fixed-header
                        />
                    </v-card>
                </v-col>
                <v-col cols="12" class="text-caption text-medium-emphasis">
                    Selected: {{ selectedAssets.length }} asset(s)
                </v-col>

            </v-row>
             <v-row class="align-center" no-gutters>
                    <v-col cols="6">
                        <v-btn
                        block
                        variant="tonal"
                        @click="handleCancel"
                        >
                            Cancel
                        </v-btn>
                    </v-col>
                    <v-col cols="6">
                        <v-btn
                        block
                        color="primary"
                        type="submit"
                        :disabled="!selectedUser || selectedAssets.length === 0"
                        >
                            Assign ({{ selectedAssets.length }})
                        </v-btn>
                    </v-col>
                </v-row>
        </v-form>
    </v-card>
</template>