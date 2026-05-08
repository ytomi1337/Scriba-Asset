<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useDirectoryStore } from '@/stores/directoryStore';
  import assetService from '@/services/api/asset-service';

  const directoryStore = useDirectoryStore()
  const form = ref({
    it_num: '',
    serial_num: '',
    model_id: null,
    imei: '',
    warranty_date: null
  })

  onMounted( async () => {
    await directoryStore.fetch('assetModels')

    try {
      const res = await assetService.getNextSequence()
      const lastNum = res.data.lastLocalNum + 1
      form.value.it_num = `${res.data.prefix}-${String(lastNum).padStart(5,'0')}`
    }catch(err){
      console.log('Error fatching last local sequence', err);
    }
    
  })

  const selectedModel = computed(() => {
    return directoryStore.assetModels.find(
      m => m.id === form.value.model_id
    )
  })

  const submitPhone = async () => {
    try{
      await apiAssetClient.createPhone(form.value)

      console.log('New Phone added corectly');
    }catch(err){
      console.log('Error', err);
    }

    console.log(form.value);
  }

  
</script>
<template>
  <v-form>
    <v-list>
      <v-list-item-title>Create new Phone in database</v-list-item-title>
      <v-list-item-subtitle>A new device has been created in DB with status: in stock</v-list-item-subtitle>
    </v-list>
    
    <v-row class="ga-2 mt-7">
      <v-text-field
      label="IT number"
      hide-details
      v-model="form.it_num"
      required
      disabled
      ></v-text-field>
      
      <v-autocomplete
      :items="directoryStore.assetModels"
      item-title="name"
      item-value="id"
      label="Phone Model"
      v-model="form.model_id"
      clearable
      no-data-text="No Models found"
      hide-details
      chips>
      </v-autocomplete>

    </v-row>
    <v-row class="ga-2 mt-7">
       <v-text-field
      label="Serial number"
      hide-details
      v-model="form.serial_num"
      ></v-text-field>

      <v-text-field
      label="IMEI"
      hide-details
      v-model="form.imei"
      ></v-text-field>

      <v-date-input
      label="Warranty date"
      v-model="form.warranty_date"
      prepend-icon=""
      clearable
      hide-details
      />

    </v-row>

    <v-row class="justify-center mt-9">
      <v-btn width="100%">Add another</v-btn>
    </v-row>
    <v-row class="justify-center mt-9">
      <v-btn @click="submitPhone">submit</v-btn>
    </v-row>
  </v-form>
</template>