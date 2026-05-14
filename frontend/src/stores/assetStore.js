import { defineStore } from "pinia";
import { ref } from "vue";
import assetService from "@/services/api/asset-service";
import { useTaskStore } from "./taskStore";

export const useAssetStore = defineStore('asset', () => {
    const taskStore = useTaskStore()
    
    const assets = ref([])
    const total = ref(0)
    const loading = ref(false)

    const params = ref({
        // page: 1,
        // limit: 7,
        search: '',
        user: null,
        category: null,
        status: null,
        nr_tel: null,
    })

    //API LOGIC
    const fetchAssets = async () => {
        try{
            loading.value = true
            const res = await assetService.getAssets(params.value)
            assets.value = res.data.data
            total.value = res.data.meta.total
        }catch (err){
            console.log('Error fetching assets', err);
        }finally{
            loading.value = false
        }
    }
    const createAsset = async (data) => {
        loading.value = true
        try {

            await assetService.createAsset(data)

            await fetchAssets()
            taskStore.refreshTasks()
        }catch (err) {
            console.error('Error creating asset', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    const setParams = async(newParams) => {
        params.value = {
            ...params.value,
            ...newParams
        }

        await fetchAssets()
    }

    const resetParams = async () => {
        params.value = {
        page: 1,
        limit: 9,
        search: '',
        user: null,
        category: null,
        status: null
        }

        await fetchAssets()
    }

    const refreshAssets = async () => {
        await fetchAssets()
    }


    return {
        assets,
        total,
        loading,
        params,


        fetchAssets,
        createAsset,
        setParams,
        resetParams,
        refreshAssets,
    }
})
