<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useDircetoryStore } from '@/stores/directoryStore';
  import { useAssetStore } from '@/stores/assetStore';
  import { useNotificationStore } from '@/stores/notificationStore';
  import apiAssetClient from '@/services/apiAssetClient';

  const emit = defineEmits(['close'])
  
  const directoryStore = useDircetoryStore()
  const assetStore = useAssetStore()
  const notificationStore = useNotificationStore()

  const asset = ref({
    it_num: '',
    serial_num: '',
    category_id: null,
    model_id: null,
    warranty_date: null
  })

  const showConfirm = ref(false)

  onMounted( async () => {
    await directoryStore.fetch('assetModels')
    await directoryStore.fetch('categories')
    await directoryStore.fetch('statuses')

    try {
      const res = await apiAssetClient.getLastSequence()
      const lastNum = res.data.lastLocalNum + 1
      asset.value.it_num = `${res.data.prefix}-${String(lastNum).padStart(5,'0')}`
    }catch(err){
      console.log('Error fatching last local sequence', err);
    }
    
  })


  const confirmCancel = () => {
    showConfirm.value = false
    emit('close')
  }

  const stay = () => {
    showConfirm.value = false
  }

  const handleCancel = () => {
    showConfirm.value = true
  }

  const submitAsset = async () => {
    try{
      await apiAssetClient.createAsset(asset.value)

      assetStore.refreshAssets()
      notificationStore.success('Asset Added Corectly')
      emit('close')

    }catch(err){
      console.log('Error', err);
    }
  }

  const filteredModels = computed(() => {
    if (!asset.value.category_id) return []

    return directoryStore.assetModels.filter(
      m => m.category_id === asset.value.category_id
    )
  })
  
</script>
<template>
  <v-card class="pa-2">
     <v-card-title class="font-weight-bold">
      Add New Device
    </v-card-title>

    <v-card-subtitle class="mb-4">
      Create a new asset assigned to your location in the system. Default status: 
      <strong>In stock</strong>
    </v-card-subtitle>

    <v-divider class="mb-4"></v-divider>

    <v-form @submit.prevent="submitAsset">
      <v-row class="ga-3" no-gutters="">
        <v-col cols="12">
         <v-text-field
            label="IT Number"
            v-model="asset.it_num"
            disabled
            hint="Auto-generated"
            persistent-hint
          />
        </v-col>

         <v-col cols="12">
          <v-autocomplete
            :items="directoryStore.categories"
            item-title="name"
            item-value="id"
            label="Category"
            v-model="asset.category_id"
            clearable
            hint="Select device category first"
            persistent-hint
          />
          </v-col>

          <v-col cols="12">
          <v-autocomplete
            :items="filteredModels"
            item-title="name"
            item-value="id"
            label="Asset Model"
            v-model="asset.model_id"
            :disabled="!asset.category_id"
            clearable
            hint="Filtered by selected category"
            persistent-hint
            no-data-text="No models available"
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            label="Serial Number"
            v-model="asset.serial_num"
            clearable
          />
        </v-col>

        <v-col cols="12">
        <v-date-input
          label="Warranty Date"
          v-model="asset.warranty_date"
          clearable
          persistent-hint
        />
      </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <v-row  no-gutters>
        <v-col cols="12" class="my-3">
          <v-btn
          block
          variant="tonal"
          disabled
          >
          + Add another (soon)
          </v-btn>
        </v-col>
         <v-col cols="6">
          <v-btn
            block
            variant="tonal"
            @click="handleCancel"
          >
            Cancel
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn
            block
            color="primary"
            type="submit"
          >
            Create Asset
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>

  <v-dialog v-model="showConfirm" max-width="400">
  <v-card>
    <v-card-title class="text-h6">
      Unsaved changes
    </v-card-title>

    <v-card-text>
      You have unsaved changes. Are you sure you want to leave?
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn variant="text" @click="stay">
        Stay
      </v-btn>

      <v-btn color="red" @click="confirmCancel">
        Leave
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>