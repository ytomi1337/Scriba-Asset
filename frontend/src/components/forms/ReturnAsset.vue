<script setup>
    import { ref, onMounted, watch } from 'vue';
    import assetService from '@/services/api/asset-service';
    import { useDictionaryStore } from '@/stores/dictionaryStore';
    import { useNotificationStore } from '@/stores/notificationStore';
    import { useAssetStore } from '@/stores/assetStore';

    const dictionaryStore = useDictionaryStore()
    const notificationStore = useNotificationStore()
    const assetStore = useAssetStore()

    const emit = defineEmits(['close'])

    const headers = [
        { title: 'ID', key: 'it_num' },
        { title: 'SN', key: 'serial_num', sortable: false,},
        { title: 'Model', key: 'model.name', sortable: false, },      
        { title: 'Category', key: 'model.category.name', sortable: false, } 
    ]
    const assets = ref([])
    const search = ref('')
    const selectedAssets = ref([])
    const selectedUser = ref(null)
    const loading = ref(false)

    onMounted( async () => {
        dictionaryStore.fetch('users');
    })

    watch(selectedUser, async() => {
        if(selectedUser.value == null){
            assets.value = []
            return
        }
        try{
            loading.value = true

            const res = await assetService.getUserAssets(selectedUser.value)
            assets.value = res.data
        }catch(err){
            console.log(err);
        }finally{
            loading.value = false
        }
    })

    const handleCancel = () => {
        emit('close')   
    }

    const submitReturn = async() => {
        try{
            const payload = {
                user: selectedUser.value,
                assets: selectedAssets.value.map(a => a.id)
            }
            await apiAssetClient.returnAsset(payload)

            assetStore.refreshAssets()
            notificationStore.success(`Asset Assigned correctly`)
            emit('close')
        }catch(err){
            console.log(err);
        }
    }
</script>

<template>
    <v-card class="pa-4">
        <v-card-title class="font-weight-bold">
         Return Device
        </v-card-title>

        <v-card-subtitle class="mb-4">
          Select a user and assign one or more assets.
        </v-card-subtitle>

        <v-divider class="mb-4" />

        <v-form @submit.prevent="submitReturn">
            <v-row>
                <v-col cols="12">
                    <v-autocomplete
                    :items="dictionaryStore.users"
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
                            Return ({{ selectedAssets.length }})
                        </v-btn>
                    </v-col>
                </v-row>
        </v-form>
    </v-card>
</template>
<!-- <template>

    <v-list>
        <v-list-item-title>Assign Device to a User</v-list-item-title>
        <v-list-item-subtitle>In the database, you will create a placeholder for the user to who you will be able to assign 
            devices after their first successful login. The placeholder will change to a regular user.</v-list-item-subtitle>
    </v-list>

    <v-autocomplete
      :items="dictionaryStore.users"
      item-title="name"
      item-value="id"
      label="Select User"
      v-model="user"
      clearable
      no-data-text="No Users found"
      hide-details
      chips>
      </v-autocomplete>

    <v-data-table
      :headers="headers"
      :items="assets"
      v-model="selectedAssets"
      return-object
      show-select
      item-value="id"
      hide-default-footer
    />

    <v-row>
        <v-btn @click="submitAssign">Return</v-btn>
    </v-row>
</template> -->