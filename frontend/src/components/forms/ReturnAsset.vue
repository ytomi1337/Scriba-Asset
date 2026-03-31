<script setup>
    import { ref, onMounted, watch } from 'vue';
    import apiAssetClient from '@/services/apiAssetClient';
    import { useDircetoryStore } from '@/stores/directoryStore';

    const directoryStore = useDircetoryStore()
    const headers = [
        { title: 'ID', key: 'it_num' },
        { title: 'SN', key: 'serial_num', sortable: false,},
        { title: 'Model', key: 'model.name', sortable: false, },      
        { title: 'Category', key: 'model.category.name', sortable: false, } 
    ]
    const assets = ref([])
    const selectedAssets = ref([])
    const user = ref(null)
    const loading = ref(false)

    onMounted( async () => {
        directoryStore.fetch('users');
    })

    watch(user, async() => {
        if(user.value == null){
            assets.value = []
            return
        }
        try{
            loading.value = true

            const res = await apiAssetClient.getUserAssets(user.value)
            assets.value = res.data
        }catch(err){
            console.log(err);
        }finally{
            loading.value = false
        }
    })

    const submitAssign = async() => {
        try{
            const payload = {
                user: user.value,
                assets: selectedAssets.value.map(a => a.id)
            }
            await apiAssetClient.returnAsset(payload)
            console.log('Dodano poprawnie');
        }catch(err){
            console.log(err);
        }
    }
</script>

<template>
    <v-list>
        <v-list-item-title>Assign Device to a User</v-list-item-title>
        <v-list-item-subtitle>In the database, you will create a placeholder for the user to who you will be able to assign 
            devices after their first successful login. The placeholder will change to a regular user.</v-list-item-subtitle>
    </v-list>

    <v-autocomplete
      :items="directoryStore.users"
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
</template>