<script setup>
    import chipGroup from './chip-group.vue';
    import apiAssetClient from '@/services/apiAssetClient';
    import { ref, onMounted } from 'vue';

    const assets = ref([])
    const columns = [
    { title: 'IT Num', key: 'it_num' },
    { title: 'Serial Number', key: 'serial_num' },
    { title: 'Model', key: 'model.name' },
    { title: 'Status', key: 'status.name' },
    { title: 'User', key: 'user.name' },
    { title: 'Category', key: 'category.name' },
    { title: 'Warranty', key: 'warranty_date' },
    { title: 'Recipt Date', key: 'recipt_date' },
    { title: 'Action', },
    ]
    onMounted (async () => {
        try{
            const res = await apiAssetClient.getAssets()
            assets.value = res.data
            console.log(assets.value);
        }catch (err) {
            console.error("❌ Błąd zaczytania danych uytkownika:", err);
        }
    })
</script>

<template>
    <chipGroup />
    <v-sheet>
    </v-sheet>

    <v-card>
        <v-data-table
        :headers="columns"
        fixed-header
        :items="assets"
        height="auto">
        </v-data-table>
    </v-card>
</template>