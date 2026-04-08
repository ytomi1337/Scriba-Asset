<script setup>
    import chipGroup from './chip-group.vue';
    import apiAssetClient from '@/services/apiAssetClient';
    import { useDircetoryStore } from '@/stores/directoryStore';
    import { ref, watch, onMounted } from 'vue';

    const directoryStore = useDircetoryStore()

    const assets = ref([])
    const phones = ref([])

    const activeChip = ref('Assets')
    const isFilterActive = ref(false)

    const loading = ref(false)

    const page = ref(1)
    const itemsPerPage = ref(9)
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
    { title: 'Action', },
    ]
    const phoneColumns = [
    { title: 'Serial Number', key: 'serial_num' },
    { title: 'IMEI', key: 'imei' },
    { title: 'Model', key: 'model' },
    { title: 'Status', key: 'status' },
    { title: 'User', key: 'user' },
    { title: 'Nr Tel', key: 'nr_tel' },
    { title: 'Recipt Date', key: 'recipt_date' },
    { title: 'Action', },
    ]

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

    async function fetchPhones () {
        try{
            loading.value = true

            const res = await apiAssetClient.getAllPhones({
                page: page.value,
                limit: itemsPerPage.value,
                
                search: filters.value.search,
                user: filters.value.user,
                nr_tel: filters.value.nr_tel
            })

            phones.value = res.data.data
            console.log(phones.value);
            totalItems.value = res.data.meta.total
        }catch(err){
            console.log(err);
        }finally{
            loading.value = false
        }
    }

    async function fetchData(){
        if(activeChip.value === 'Assets'){
            await fetchAssets()
        } else {
            await fetchPhones()
        }
    }

    async function loadItems(options){
        page.value = options.page
        itemsPerPage.value = options.itemsPerPage

        await fetchData()
    }

    onMounted( async () =>{
        await directoryStore.fetch('categories')
        await directoryStore.fetch('users')

        await fetchData()
    })

    watch(filters, () => {
        page.value = 1
        fetchData()
    }, { deep: true })
</script>

<template>
    <chipGroup 
    @send-active-chip="activeChip = $event"
    @send-filter-dislpay="isFilterActive = !isFilterActive, console.log(isFilterActive);"/>
    <v-sheet>
    </v-sheet>

    <v-expand-transition>
        <v-container v-show="isFilterActive">
            <v-row 
            v-if="activeChip == 'Assets'" 
            >
                <v-text-field
                    v-model="filters.search"
                    label="Search"
                    clearable
                    >
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

            <v-row v-else>
        <v-text-field
            v-model="filters.search"
            label="Search"
            clearable>
        </v-text-field>

        <v-text-field
            v-model="filters.nr_tel"
            label="Nr Tel"
            clearable>
        </v-text-field>
        <v-select
            v-model="filters.user"
            :items="directoryStore.users"
            item-title="name"
            item-value="id"
            label="User"
            clearable>

        </v-select>

            </v-row>
        </v-container>

        
    </v-expand-transition>
    <v-card>
        <v-data-table
        v-if="activeChip === 'Assets'"
        :headers="columns"
        :items="assets"
        :items-length="totalItems"
        :loading="loading"
        @update:options="loadItems"
        density="compact"
        height="325"
        hide-default-footer
        />
        

        <v-data-table
        v-if="activeChip === 'Phones'"
        :headers="phoneColumns"
        :items="phones"
        :items-length="totalItems"
        :loading="loading"
        @update:options="loadItems"
        density="compact"
        height="325"
        hide-default-footer
        />
    </v-card>
</template>

