<script setup>
import { useTaskStore } from '@/stores/taskStore';
import assetAction from './asset-action.vue';
import apiAssetClient from '@/services/apiAssetClient';
import { statusColor } from './functionUtils';
import { ref, onMounted } from 'vue';

const taskStore = useTaskStore()

const expanded = ref([])

const fileInput = ref(null)
const currentTask = ref(null)

const columns = [
    { title: '', key: 'data-table-expand' }, 
    { title: 'ID', key: 'id' },
    { title: 'Created', key: 'assignedBy.name' },
    { title: 'Assigned', key: 'assignedTo.name' },
    { title: 'Type', key: 'type' },
    { title: 'Status', key: 'status' },
    { title: 'Date', key: 'created_at' },
    { title: 'File', key: 'file' },
]

onMounted(async () => {
    await taskStore.fetchTasks()
})

const printDocument = (task) => {

  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = `/uploads/tasks/${task.file}`

  document.body.appendChild(iframe)

  iframe.onload = () => {
    iframe.contentWindow.focus()
    iframe.contentWindow.print()

    setTimeout(() => {
      document.body.removeChild(iframe)
    }, 1000)
  }
}

const openFilePicker = (task) => {
    currentTask.value = task
    fileInput.value.click()
}

const handleFileSelected = async (event) => {
    const file = event.target.files[0]
    if (!file || !currentTask.value) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('taskId', currentTask.value.id)

    try {
        await apiAssetClient.uploadTaskFile(formData)

        await taskStore.fetchTasks()

    } catch (err) {
        console.error('Upload failed', err)
    }

    event.target.value = null
    currentTask.value = null
}
</script>

<template>
    <v-data-table
        :headers="columns"
        :items="taskStore.tasks"
        :loading="taskStore.loading"
        v-model:expanded="expanded"
        show-expand
        item-value="id"
        density="compact"
    >
        <template #expanded-row="{ item }">
            <tr>
                <td :colspan="columns.length">
                    <div class="pa-2">
                        <v-row dense>
                            <v-col
                            v-for="assetItem in item.items"
                            :key="assetItem.asset_id"
                            cols="12" sm="6" md="4">
                                <v-card variant="flat" class="card-base pa-2" >
                                    <div class="d-flex mb-2 align-center justify-space-between">
                                        <div>
                                            <v-icon
                                            :icon="assetItem.asset.model.category.icon"
                                            class="mr-2"
                                            />
                                            <strong>{{ assetItem.asset.model.name }}</strong>
                                        </div>
                                        <div>
                                            <assetAction :asset="assetItem.asset"/>
                                        </div>

                                    </div>

                                    <div class="text-caption text-medium-emphasis">IT Number</div>
                                    <v-chip class="mb-2" size="small" variant="outlined">
                                        {{ assetItem.asset.it_num }}
                                    </v-chip>
                                    <div class="text-caption text-medium-emphasis">Serial</div>
                                        <v-chip size="small" color="primary" variant="flat">
                                        {{ assetItem.asset.serial_num }}
                                    </v-chip>

                                    
                                </v-card>
                            </v-col>
                        </v-row>
                    </div>
                </td>
            </tr>
        </template>

<template v-slot:item.status="{ item }">
      <v-chip
        border="thin"
        :color="statusColor(item.status)"
        :text="item.status"
        size="x-small"
      ></v-chip>
    </template>

        <template #item.file="{ item }">
            <v-btn
            v-if="!item.file"
            size="small"
            variant="tonal"
            @click="openFilePicker(item)"
            >
            Upload PDF
            </v-btn>

            <v-btn
            variant="tonal"
            size="small"
            color="blue"
            v-else
            @click="printDocument(item)">
            <v-icon>mdi-printer</v-icon>
            print
            </v-btn>
        </template>
    </v-data-table>

    <input
        type="file"
        ref="fileInput"
        accept="application/pdf"
        style="display: none"
        @change="handleFileSelected"
    />
</template>