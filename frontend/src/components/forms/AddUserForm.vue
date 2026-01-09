<script setup>
import { ref, onMounted } from 'vue'
import apiAssetClient from '@/services/apiAssetClient';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore()
const search = ref('')

const headers = [
  { title: 'ID', key: 'it_num' },
  { title: 'SN', key: 'serial_num', sortable: false,},
  { title: 'Model', key: 'model.name', sortable: false, },      
  { title: 'Category', key: 'category.name', sortable: false, } 
]
const assets = ref([])
const selectedAssets= ref([])
const userPlaceholder = ref({name: "", email: "", localization:""})

const step = ref(1)


onMounted( async () => {
  try{
    const res = await apiAssetClient.getAvailableAssets(userStore.user.id);
    assets.value = res.data

    console.log(assets.value);
  }catch (err) {
    console.error("❌ Error during loading availbe assets:", err);
  }
})

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

  <template v-slot:item.1>
    <v-card max-width="500">
        <form @submit.prevent="submitForm">
            <v-form ref="form">
                <v-text-field label="Name" :rules="[v => !!v || 'Required']" 
                v-model="userPlaceholder.name"/>
                <v-text-field  label="Email" :rules="[v => !!v || 'Required']" 
                v-model="userPlaceholder.email" />
                <v-text-field label="Localization" :rules="[v => !!v || 'Required']"
                v-model="userPlaceholder.localization"/>

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
      v-model="selectedAssets"
      return-object
      show-select
      item-key="id"
      :search="search"
      hide-default-footer
    />
  </template>

  <template v-slot:item.3>
    <v-row no-gutters>
      <v-col cols="6"><p>Placeholder data:</p>
        <v-list>
          <v-list-item title="Name" :subtitle="userPlaceholder.name"></v-list-item>
          <v-list-item title="Email" :subtitle="userPlaceholder.email"></v-list-item>
          <v-list-item title="Localization" :subtitle="userPlaceholder.localization"></v-list-item>
        </v-list>
      </v-col>
      <v-col cols="6">
        <p>Slected Assets:</p>
        <v-list>
          <v-list-item v-for="item in selectedAssets"
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
      <v-btn v-if="step == 3" @click="finish">Finish</v-btn> 
    </v-row>
  </template>
</v-stepper>

</template>

<style scoped>
</style>