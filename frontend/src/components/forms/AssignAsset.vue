<script setup>
    import { ref, onMounted } from 'vue';
    import apiAssetClient from '@/services/apiAssetClient';
    import { useUserStore } from '@/stores/userStore';
    import { useDircetoryStore } from '@/stores/directoryStore';

    const userStore = useUserStore()
    const directoryStore = useDircetoryStore()
    const headers = [
        { title: 'ID', key: 'it_num' },
        { title: 'SN', key: 'serial_num', sortable: false,},
        { title: 'Model', key: 'model.name', sortable: false, },      
        { title: 'Category', key: 'category.name', sortable: false, } 
    ]
    const assets = ref([])
    const selectedAssets = ref([])
    const search = ref('')
    const user = ref(null)
    const users = ref([])

    onMounted( async () => {
        directoryStore.fetch('users');
        try{
            const res = await apiAssetClient.getUsersFromLocalziation();
            users.value = res.data.regularUsers

        }catch (err) {
            console.error("❌ Error during loading availbe assets:", err);
        }
        try{
            const res = await apiAssetClient.getAvailableAssets(userStore.user.id);
            assets.value = res.data

        }catch (err) {
            console.error("❌ Error during loading availbe assets:", err);
        }
    })

    const submitAssign = async() => {
        try{
            const payload = {
                user: user.value,
                assets: selectedAssets.value.map(a => a.id)
            }

            console.log(payload);
            await apiAssetClient.assignAsset(payload)
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
      :items="users"
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
      :search="search"
      hide-default-footer
    />

    <v-row>
        <v-btn @click="submitAssign">Assign</v-btn>
    </v-row>
</template>