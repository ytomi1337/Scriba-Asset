import { defineStore } from "pinia"
import { ref } from "vue"
import apiAssetClient from "@/services/apiAssetClient"

export const useTaskStore = defineStore('task', () => {
    const tasks = ref([])
    const total = ref(0)
    const loading = ref(false)

    const params =({
        // page: 1,
        // limit: 10,
        search: '',
        assigned_to: null,
        assigned_by: null,
        status: null
    }) 

    const fetchTasks = async () => {
        try{
            loading.value = true
            const res = await apiAssetClient.getLocalTasks(params.value)
            console.log(res);
            tasks.value = res.data.data
            total.value = res.data.meta.total
        }catch(err){
            console.log('Error fetching taks', err);
        }finally{
            loading.value = false
        }
    }

    const setParams = async(newParams) => {
        params.value = {
            ...params.value,
            ...newParams
        }

        await fetchTasks()
    }

    const resetParams = async () => {
        params.value = {
        // page: 1,
        // limit: 10,
        search: '',
        assigned_to: null,
        assigned_by: null,
        status: null
        }

        await fetchTasks()
    }

    const refreshTasks = async () => {
        await fetchTasks()
    }

    return {
        tasks,
        total,
        loading,
        params,


        fetchTasks,
        setParams,
        resetParams,
        refreshTasks
    }
})