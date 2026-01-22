<script setup>
  import { ref, onMounted } from 'vue';
  import { useDircetoryStore } from '@/stores/directoryStore';
  import apiAssetClient from '@/services/apiAssetClient';

  const directoryStore = useDircetoryStore()
  const asset = ref({})


  onMounted( async () => {
    await directoryStore.fetch('assetModels')
    await directoryStore.fetch('categories')
    await directoryStore.fetch('statuses')

    try {
      const res = await apiAssetClient.getLastSequence()

      asset.value.it_num = `${res.data.prefix}-${String(res.data.lastLocalNum).padStart(5,'0')}`
    }catch(err){
      console.log('Error fatching last local sequence', err);
    }
    
  })

  const submitAsset = async () => {
    try{
      await apiAssetClient.createAsset(asset.value)

      console.log('Asset added corectly');
    }catch(err){
      console.log('Error', err);
    }
  }
</script>
<template>
  <v-form>
    <v-list>
      <v-list-item-title>Create new device in database</v-list-item-title>
      <v-list-item-subtitle>A new device has been created in DB with status: in stock</v-list-item-subtitle>
    </v-list>
    
    <v-row class="ga-2 mt-7">
      <v-text-field
      label="IT number"
      hide-details
      v-model="asset.it_num"
      ></v-text-field>
      
      <v-text-field
      label="Serial number"
      hide-details
      v-model="asset.serial_num"
      ></v-text-field>
    </v-row>
    <v-row class="ga-2 mt-7">
      <v-autocomplete
      :items="directoryStore.assetModels"
      item-title="name"
      item-value="id"
      label="Asset Model"
      v-model="asset.model_id"
      clearable
      no-data-text="No Models found"
      hide-details
      chips>
      </v-autocomplete>

      <v-autocomplete
      :items="directoryStore.categories"
      item-title="name"
      item-value="id"
      label="Category"
      v-model="asset.category_id"
      clearable
      no-data-text="No Categories found"
      hide-details
      chips>
      </v-autocomplete>

      <v-autocomplete
      :items="directoryStore.statuses"
      item-title="name"
      item-value="id"
      label="Status"
      v-model="asset.status_id"
      clearable
      no-data-text="No Statuses found"
      hide-details
      chips>
      </v-autocomplete>

      <v-date-input
      label="Warranty date"
      v-model="asset.warranty_date"
      prepend-icon=""
      clearable
      hide-details
      />

    </v-row>

    <v-row class="justify-center mt-9">
      <v-btn width="100%">Add another</v-btn>
    </v-row>
    <v-row class="justify-center mt-9">
      <v-btn @click="submitAsset">submit</v-btn>
    </v-row>
  </v-form>
</template>