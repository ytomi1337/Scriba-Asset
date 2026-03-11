<script setup>
    import chipGroup from './chip-group.vue';
    import apiAssetClient from '@/services/apiAssetClient';
    import { useDircetoryStore } from '@/stores/directoryStore';
    import { ref, watch, onMounted } from 'vue';

    const directoryStore = useDircetoryStore()

    const assets = ref([])
    const phones = ref([])
    const activeChip = ref('Assets')
    const loading = ref(false)

    const page = ref(1)
    const itemsPerPage = ref(6)
    const totalItems = ref(0)

    const filters = ref({
        search: '',
        status: null,
        category: null,
        user: null,
    })

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
    // const phoneColumns = [
    // { title: 'Serial Number', key: 'serial_num' },
    // { title: 'IMEI', key: 'model.name' },
    // { title: 'Model', key: 'model.imei' },
    // { title: 'Status', key: 'status.name' },
    // { title: 'User', key: 'user.name' },
    // { title: 'Warranty', key: 'warranty_date' },
    // { title: 'Recipt Date', key: 'recipt_date' },
    // { title: 'Action', },
    // ]

    async function fetchAssets () {
        try{
            loading.value = true

            const res = await apiAssetClient.getAllAssets({
                page: page.value,
                limit: itemsPerPage.value,
                
                search: filters.value.search,
                user: filters.value.user,
                category: filters.value.category,
                status: filters.value.status
            })

            assets.value = res.data.data
            totalItems.value = res.data.meta.total
        }catch(err){
            console.log(err);
        }finally{
            loading.value = false
        }
    }

    async function loadItems(options) {

        page.value = options.page
        itemsPerPage.value = options.itemsPerPage

        await fetchAssets()
    }

    onMounted( async () =>{
        await directoryStore.fetch('categories')
        await directoryStore.fetch('users')
    })

    watch(filters, () => {
        page.value = 1
        fetchAssets()
    }, { deep: true })
</script>

<template>
    <chipGroup @send-active-chip="activeChip = $event "/>
    <v-sheet>
    </v-sheet>

    <v-row no-gutters>
        <v-text-field
            v-model="filters.search"
            label="Search"
            clearable>
        </v-text-field>

        <v-select
            v-model="filters.category"
            :items="directoryStore.categories"
            item-title="name"
            item-value="id"
            label="Category"
            clearable>

        </v-select>
        <v-select
            v-model="filters.user"
            :items="directoryStore.users"
            item-title="name"
            item-value="id"
            label="User"
            clearable>

        </v-select>

    </v-row>
    <v-card>
        <v-data-table
        v-if="activeChip == 'Assets'"
        :headers="columns"
        :items="assets"
        :loading="loading"
        :items-length="totalItems"
        :items-per-page="itemsPerPage"
        :page="page"
        @update:options="loadItems"
        height="auto"
        fixed-header>
        </v-data-table>

        <!-- <v-data-table
        v-if="activeChip == 'Phones'"
        :headers="phoneColumns"
        fixed-header
        :items="phones"
        height="auto">
        </v-data-table> -->
    </v-card>
</template>

