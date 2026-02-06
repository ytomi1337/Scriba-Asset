<script setup>
    import { ref, onMounted } from 'vue';
    import apiAssetClient from '@/services/apiAssetClient';
    import { formatDate } from "../utils/functionUtils";

    const tasks = ref([])
    const dialog = ref(false)
    const activeTask = ref(null)

    onMounted ( async () =>{
        try{
            const res = await apiAssetClient.getTasks()
            tasks.value = res.data.finishedTasks

            console.log(tasks.value);
        }catch(err){
            console.log('Error fetching tasks', err);
        }
    })

    const openDetail = async (item) => {
        console.log('siurek');
        activeTask.value = item,
        dialog.value = true
    }

    const statusColor = function (s) {
        if (!s) return 'grey'
        if (s.toLowerCase().includes('pending')) return 'orange'
        if (s.toLowerCase().includes('accepted')) return 'green'
        if (s.toLowerCase().includes('rejected') || s.toLowerCase().includes('cancel')) return 'red'
        return 'primary'
    }
</script>

<template>
    <v-list>
        <v-list-item 
            v-for="(task, i) in tasks"
            :key="i"
            @click="openDetail(task)"
            :title="task.id">
            <template v-slot:append>
                <v-icon v-if="!task.attachment" icon="mdi-alert-circle-outline"></v-icon>
                <v-icon v-else icon="mdi-check-circle-outline"></v-icon>
            </template>
        </v-list-item>
    </v-list>
      <v-dialog
        v-model="dialog"
        max-width="600">

        <v-card
        :title="`${activeTask.assignedBy.name}, sends you new devices to receive.`"
        :subtitle="`Date: ${formatDate(activeTask.created_at)}`"
        >
        <template v-slot:prepend>
            <v-avatar
            rounded="50"
            size="40" 
            class="mr-2">
            <img :src="activeTask.assignedBy.avatar" alt="avatar" width="100%"/>
            </v-avatar>
        </template>

        <v-list>
            <v-list-item
            class="text-body-2">
                 <v-list-item-title class="text-body-2 mb-8">
                    <v-chip size="small" :color="statusColor(activeTask.status)" label>
                        {{ activeTask.status }}
                      </v-chip>
                </v-list-item-title>

                <v-row v-for="(item, i) in activeTask.items" no-gutters class="my-3">
                    <v-col  cols="4">
                        {{ item.asset.model.name }}
                    </v-col>
                    <v-col cols="3">
                        {{ item.asset.it_num }}
                    </v-col>
                    <v-col cols="4">
                        {{ item.asset.serial_num }}
                    </v-col>
                    <v-col cols="1">
                        <v-icon :icon="item.asset.category.icon "></v-icon>
                    </v-col>
                </v-row>
            </v-list-item>
        </v-list>
        <v-list>
            <v-list-item>
                    <v-list-item-title>
                      <a target="_blank">Attach a File</a>
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-disabled text-body-2">
                        {{ activeTask.id }}
                    </v-list-item-subtitle>
                  </v-list-item>
        </v-list>
     </v-card>



    </v-dialog>
</template>