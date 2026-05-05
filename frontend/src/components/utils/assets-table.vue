<script setup>
    import chipGroup from './chip-group.vue';

    import { useDircetoryStore } from '@/stores/directoryStore';
    import { useAssetStore } from '@/stores/assetStore';

    import { ref, watch, onMounted } from 'vue';
    import assetAction from './asset-action.vue';

    const directoryStore = useDircetoryStore()
    const assetStore = useAssetStore()

    const activeChip = ref('Assets')
    const isFilterActive = ref(false)

    const filters = ref({
        search: '',
        status: null,
        category: null,
        user: null,
        nr_tel: null,
    })

    const columns = [
    { title: 'IT Num', key: 'it_num' },
    { title: 'Serial Number', key: 'serial_num' },
    { title: 'Model', key: 'model.name' },
    { title: 'Status', key: 'status.name' },
    { title: 'User', key: 'user.name' },
    { title: 'Category', key: 'model.category.name' },
    { title: 'Warranty', key: 'warranty_date' },
    { title: 'Action', key: 'action'},
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

    onMounted( async () =>{
        await directoryStore.fetch('categories')
        await directoryStore.fetch('users')
        await assetStore.fetchAssets()
        await assetStore.setParams()
    })

    watch(filters, () => {
        assetStore.setParams({
            ...filters.value,
            page: 1
        })
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
        :items="assetStore.assets"
        :loading="assetStore.loading"
        density="compact"
        
        >
        <template #item.action="{ item }">
            <assetAction :asset="item" />
        </template>
        </v-data-table>
        

        <!-- <v-data-table
        v-if="activeChip === 'Phones'"
        :headers="phoneColumns"
        :items="phones"
        :items-length="totalItems"
        :loading="loading"
        @update:options="loadItems"
        density="compact"
        height="325"
        hide-default-footer
        /> -->
    </v-card>
</template>

