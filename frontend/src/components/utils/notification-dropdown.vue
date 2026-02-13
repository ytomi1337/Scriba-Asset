<script setup>
import { ref, onMounted } from 'vue';
import { formatDate } from "../utils/functionUtils";
import api from "@/services/apiAssetClient";

const tasks = ref([])
const dialog = ref(false)
const activeTask = ref(null)

onMounted( async () => {
    try {
    const res = await api.getTasks();
    tasks.value = res.data.pendingTasks
  } catch (err) {
    console.error("❌ Błąd zaczytania Zadan:", err);
  }
})

const openDetail = async (item) => {
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

const taskDecision = async (decision) => {
    try{
        console.log(activeTask.value.id);
        console.log(decision);
        await api.sendTaskDecision(activeTask.value.id, decision)
    }catch(err){
        console.log(err);
    }
    dialog.value = false
}

</script>

<template>
    <v-menu offset-y
    transition="slide-x-transition"
    location="start">
        <template #activator="{ props }">
            <v-badge
            v-if="tasks.length"
            :content="tasks.length"
            v-bind="props"
            >
                <v-btn
                icon
                aria-label="notifications">
                    <v-icon>mdi-bell-outline</v-icon>
                </v-btn>
            </v-badge>
            <v-btn
            v-else
            v-bind="props"
            icon
            aria-lebel="notifications">
                <v-icon>mdi-bell-outline</v-icon>
            </v-btn>
        </template>

        <template v-if="tasks.length">
            <v-list>
                <v-list-item
                    v-for="(task, i) in tasks"
                    :key="i"
                    @click="openDetail(task, i)"
                    max-width="500"
                    prepend-icon="mdi-book-check"
                    class="task-item pa-2">
                    <v-list-item-title>
                        New task: {{ task.type }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Created by: {{ task.assignedBy.name }}, at {{ formatDate(task.created_at) }}
                    </v-list-item-subtitle>
                    
                </v-list-item>
            </v-list>
        </template>
    </v-menu>
    <v-dialog
    v-model="dialog"
    persistent
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
                        <v-icon :icon="item.asset.model.category.icon "></v-icon>
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
        
            <template v-slot:actions>
            <v-spacer></v-spacer>

            <v-btn @click="taskDecision('confirm')">
            Confirm
            </v-btn>

            <v-btn @click="dialog = false">
            Reject
            </v-btn>
            </template>
        </v-card>


    </v-dialog>
</template>

<style scoped>
    .task-item{
        border-bottom:1px solid #dcd5d557;;
    }
</style>
