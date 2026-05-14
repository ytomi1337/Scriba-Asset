<script setup>
import { ref, onMounted } from 'vue'
import userService from '@/services/api/user-service';
import { useDictionaryStore } from '@/stores/dictionaryStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { useAssetStore } from '@/stores/assetStore';
import { useTaskStore } from '@/stores/taskStore';

const dictionaryStore = useDictionaryStore()
const notificationStore = useNotificationStore()
const assetStore = useAssetStore()
const taskStore = useTaskStore()

const emit = defineEmits(['close'])

const headers = [
  { title: 'ID', key: 'it_num' },
  { title: 'SN', key: 'serial_num', sortable: false,},
  { title: 'Model', key: 'model.name', sortable: false, },      
  { title: 'Category', key: 'model.category.name', sortable: false, } 
]
const assets = ref([])
const search = ref('')
const step = ref(1)
const errorMsg = ref(null)

const placeHolder = ref({
  user: {
    name: '',
    email: '',
    localization_id: null
  },
  selectedAssets: []
})

onMounted( async () => {
  dictionaryStore.fetch('localizations');
  try{
    const res = await apiAssetClient.getStock();
    assets.value = res.data

  }catch (err) {
    console.error("❌ Error during loading availbe assets:", err);
  }
})

const submitForm = async() => {
  try {
    const payload = {
      user: placeHolder.value.user,
      assets: placeHolder.value.selectedAssets.map(a => a.id)
    }
    await userService.createUser(payload)

    taskStore.refreshTasks()
    notificationStore.success(`New User Created Succesfly`)
    emit('close')
  }catch (err) {
    const status = err.response?.status;

    if (status === 409) {
      errorMsg.value = err.response.data.error.message;
    } else {
      errorMsg.value = 'Unexpected server error, check console for more details';
      console.error(err);
    }
  }
}
</script>

<template>
  <v-card class="pa-2">
    <v-card-title class="font-weight-bold">Create User Placeholder</v-card-title>
    <v-card-subtitle class="mb-4">In the database, you will create a placeholder for the user to who you will be able to <br>assign 
        devices after their first successful login. The placeholder will change to a <br>regular user.
    </v-card-subtitle>

    <v-divider class="mb-4" />

  <v-stepper 
    flat
    :items="['Create Placeholder','Assign Device', 'Finish']"
    v-model="step"
    class="no-shadow">

    <template v-slot:item.1>
      <v-row>
        <v-col cols="12">
          <v-text-field
            append-inner-icon="mdi-account"
            label="Name"
            v-model="placeHolder.user.name"
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            append-inner-icon="mdi-email"
            label="Email"
            v-model="placeHolder.user.email"
          />
        </v-col>

        <v-col cols="12">
          <v-select
            label="Localization"
            :items="dictionaryStore.localizations"
            v-model="placeHolder.user.localization_id"
            item-title="name"
            item-value="id"
          />
        </v-col>
      </v-row>
    </template>

    <template v-slot:item.2>

        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        ></v-text-field>

      <v-data-table
        :headers="headers"
        :items="assets"
        v-model="placeHolder.selectedAssets"
        return-object
        show-select
        item-value="id"
        :search="search"
        hide-default-footer
      />
    </template>

    <template v-slot:item.3>
     <v-row>
          <v-col cols="12" md="6">
            <v-card variant="outlined" class="pa-3">
              <div class="font-weight-medium mb-2">User</div>

              <v-list density="compact">
                <v-list-item title="Name" :subtitle="placeHolder.user.name" />
                <v-list-item title="Email" :subtitle="placeHolder.user.email" />
                
              </v-list>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card variant="outlined" class="pa-3">
              <div class="font-weight-medium mb-2">Assets</div>

              <v-list density="compact">
                <v-list-item
                  v-for="item in placeHolder.selectedAssets"
                  :key="item.id"
                  :title="item.model?.name"
                  :subtitle="item.it_num"
                />
              </v-list>
            </v-card>
          </v-col>
        </v-row>

    </template>

    <template #actions>
      <v-row no-gutters class="d-flex justify-end ma-1" style="gap: 10px;">
        <v-btn v-if="step > 1" @click="step--">Back</v-btn>
        <v-btn v-if="step < 3" @click="step++">Next</v-btn>
        <v-btn v-if="step == 3" @click="submitForm">Finish</v-btn> 
      </v-row>
    </template>
  </v-stepper>

  </v-card>
</template>

<style scoped>
</style>