<script setup>
    import { ref, onMounted } from 'vue';
    import apiAssetClient from '@/services/apiAssetClient';

    const tasks = ref([])

    onMounted ( async () =>{
        try{
            const res = await apiAssetClient.getTasks()
            tasks.value = res.data.finishedTasks

            console.log(tasks.value);
        }catch(err){
            console.log('Error fetching tasks', err);
        }
    })
</script>

<template>
    <v-list>
        <v-list-item v-for="task in tasks">
            {{ task.id }}
        </v-list-item>
    </v-list>
</template>