<script setup>
import { ref, onMounted } from 'vue'
import apiAssetClient from '@/services/apiAssetClient';
import { useUserStore } from '@/stores/userStore';
import { useDircetoryStore } from '@/stores/directoryStore';

const userStore = useUserStore()
const directoryStore = useDircetoryStore()
const search = ref('')

const headers = [
  { title: 'ID', key: 'it_num' },
  { title: 'SN', key: 'serial_num', sortable: false,},
  { title: 'Model', key: 'model.name', sortable: false, },      
  { title: 'Category', key: 'category.name', sortable: false, } 
]
const assets = ref([])
const placeHolder = ref({ selectedAssets: [], user: {}  })
const step = ref(1)

const errorMsg = ref(null)


onMounted( async () => {
  directoryStore.fetch('localizations');
  try{
    const res = await apiAssetClient.getAvailableAssets();
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
    await apiAssetClient.createUser(payload)

    errorMsg.value = 'udalo sie juhu'
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
    <v-list>
        <v-list-item-title>Create User Placeholder</v-list-item-title>
        <v-list-item-subtitle>In the database, you will create a placeholder for the user to who you will be able to assign 
            devices after their first successful login. The placeholder will change to a regular user.</v-list-item-subtitle>
    </v-list>

<v-stepper 
  flat
  :items="['Create Placeholder','Assign Device', 'Finish']"
  v-model="step"
  class="no-shadow">
  <v-alert
    v-if="errorMsg"
    type="error"
    variant="tonal"
    class="mb-4"
    >
    {{ errorMsg }}
  </v-alert>

  <template v-slot:item.1>
    <v-card max-width="500">
        <form @submit.prevent="submitForm">
            <v-form ref="form">
                <v-text-field label="Name" :rules="[v => !!v || 'Required']" 
                v-model="placeHolder.user.name"/>
                <v-text-field  label="Email" :rules="[v => !!v || 'Required']" 
                v-model="placeHolder.user.email" />
                <v-select
                  label="Localizations"
                  :items="directoryStore.localizations"
                  v-model="placeHolder.user.localization_id"
                  item-title="name"
                  item-value="id"></v-select>
            </v-form>
        </form>
    </v-card>
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
    <v-row no-gutters>
      <v-col cols="6"><p>Placeholder data:</p>
        <v-list>
          <v-list-item title="Name" :subtitle="placeHolder.user.name"></v-list-item>
          <v-list-item title="Email" :subtitle="placeHolder.user.email"></v-list-item>
          <v-list-item title="Localization" :subtitle="placeHolder.user.localization_id"></v-list-item>
        </v-list>
      </v-col>
      <v-col cols="6">
        <p>Slected Assets:</p>
        <v-list>
          <v-list-item v-for="item in placeHolder.selectedAssets"
          :key="item.id"
          :title="item.model.name">
            <v-list-item-subtitle> {{ item.it_num }} </v-list-item-subtitle>
          </v-list-item>

        </v-list>
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

</template>

<style scoped>
</style>