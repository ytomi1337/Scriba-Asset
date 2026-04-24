<script setup>
    import { ref, onMounted, watch, computed } from 'vue';
    import apiAssetClient from '@/services/apiAssetClient';
    import { formatDate } from "../utils/functionUtils";

    const tasks = ref([])
    const dialog = ref(false)
    const activeTask = ref(null)
    const selectedFile = ref(null)

    const taskTitle = computed(() => {
        if (!activeTask.value) return ''

        switch (activeTask.value.type) {
            case 'Assign':
            return `${activeTask.value.assignedBy.name} sends you new devices to receive.`
            case 'Return':
            return `${activeTask.value.assignedBy.name} requires your devices to return.`
            default:
            return `${activeTask.value.assignedBy.name} sent you a task.`
        }
        })

    onMounted ( async () =>{
        try{
            const res = await apiAssetClient.getTasks()
            tasks.value = res.data.finishedTasks
        }catch(err){
            console.log('Error fetching tasks', err);
        }
    })

    watch(dialog, (val) => {
        if (!val) {
            selectedFile.value = null
        }
    })

    const openDetail = async (item) => {
        activeTask.value = item,
        console.log(activeTask.value.file);
        dialog.value = true
    }

    const uploadFile = async () => {
        const formData = new FormData()
        formData.append('file', selectedFile.value) 
        formData.append('taskId', activeTask.value.id)

        try{
            await apiAssetClient.uploadTaskFile(formData)
            selectedFile.value = null
            dialog.value = false
        }catch (err) {
            console.error('Upload failed', err)
        }
    }

    const statusColor = function (s) {
        if (!s) return 'grey'
        if (s.toLowerCase().includes('pending')) return 'orange'
        if (s.toLowerCase().includes('accepted')) return 'green'
        if (s.toLowerCase().includes('rejected') || s.toLowerCase().includes('cancel')) return 'red'
        return 'primary'
    }

const printDocument = () => {
  if (!activeTask.value?.file) return

  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = `/uploads/tasks/${activeTask.value.file}`

  document.body.appendChild(iframe)

  iframe.onload = () => {
    iframe.contentWindow.focus()
    iframe.contentWindow.print()

    setTimeout(() => {
      document.body.removeChild(iframe)
    }, 1000)
  }
}
</script>

<template>
    <v-list v-if="tasks.length">
        <v-list-item 
            v-for="(task, i) in tasks"
            :key="i"
            @click="openDetail(task)"
            :title="task.id">
            <template v-slot:append>
                <v-icon v-if="!task.file" icon="mdi-alert-circle-outline" color="red"></v-icon>
                <v-icon v-else icon="mdi-check-circle-outline" color="green"></v-icon>
            </template>
        </v-list-item>
    </v-list>
    <template v-else>
        <div class="empty-state">No tasks yet</div>
    </template>
    <v-dialog
        v-model="dialog"
        max-width="600">

        <v-card
        :title="taskTitle"
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
            <v-row no-gutters>
                <v-col cols="8">
                    <v-file-input
                    v-if="!activeTask.file" 
                    v-model="selectedFile"
                    label="Attach PDF file"
                    accept=".pdf"
                    show-size
                    clearable
                    density="compact">
                        
                    </v-file-input>
                    <v-list-item
                        v-else
                        :title="activeTask.file"
                        prepend-icon="mdi-paperclip">
                    </v-list-item>
                </v-col>
                <v-col cols="4" class="d-flex justify-center">
                     <v-btn
                    v-if="!activeTask.file" 
                    :disabled="!selectedFile"
                    @click="uploadFile"
                    >
                    Upload PDF
                    </v-btn>
                    <v-btn
                    variant="tonal"
                    color="blue"
                    v-else
                    @click="printDocument">
                        <v-icon>mdi-printer</v-icon>
                        print
                    </v-btn>
                </v-col>
            </v-row>
     </v-card>



    </v-dialog>
</template>

