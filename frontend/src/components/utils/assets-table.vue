<script setup>
    import chipGroup from './chip-group.vue';
    import apiAssetClient from '@/services/apiAssetClient';
    import { ref, onMounted, defineProps, computed } from 'vue';

    const props = defineProps({
        activeChip: String
    })

    const assets = ref([])
    const phones = ref([])
    const activeChip = ref('Assets')

    const columns = [
    { title: 'IT Num', key: 'it_num' },
    { title: 'Serial Number', key: 'serial_num' },
    { title: 'Model', key: 'model.name' },
    { title: 'Status', key: 'status.name' },
    { title: 'User', key: 'user.name' },
    { title: 'Category', key: 'model.category.name' },
    { title: 'Warranty', key: 'warranty_date' },
    { title: 'Recipt Date', key: 'recipt_date' },
    { title: 'Action', },
    ]
    const phoneColumns = [
    { title: 'Serial Number', key: 'serial_num' },
    { title: 'IMEI', key: 'model.name' },
    { title: 'Model', key: 'model.imei' },
    { title: 'Status', key: 'status.name' },
    { title: 'User', key: 'user.name' },
    { title: 'Warranty', key: 'warranty_date' },
    { title: 'Recipt Date', key: 'recipt_date' },
    { title: 'Action', },
    ]

    onMounted (async () => {
        try{
            const res = await apiAssetClient.getAssets()
            assets.value = res.data.assets
            phones.value = res.data.phones
        }catch (err) {
            console.error("❌ Błąd zaczytania danych uytkownika:", err);
        }
    })
</script>

<template>
    <chipGroup @send-active-chip="activeChip = $event "/>
    <v-sheet>
    </v-sheet>

    <v-card>
        <v-data-table
        v-if="activeChip == 'Assets'"
        :headers="columns"
        fixed-header
        :items="assets"
        height="auto">
        </v-data-table>

        <v-data-table
        v-if="activeChip == 'Phones'"
        :headers="phoneColumns"
        fixed-header
        :items="phones"
        height="auto">
        </v-data-table>
    </v-card>
</template>



DOKONCZYC WYRZUACANIE DANYCH PHONE DO TABELI NA FRONTEND Z BACKEND