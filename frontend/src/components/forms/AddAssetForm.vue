<script setup>
  import { ref, onMounted } from 'vue';
  import { useDircetoryStore } from '@/stores/directoryStore';

  const directoryStore = useDircetoryStore()
  const assets = ref(null)

  onMounted( async () => {
    directoryStore.fetch('assetModels')
    directoryStore.fetch('categories')
    directoryStore.fetch('statuses')
  })
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
      ></v-text-field>
      
      <v-text-field
      label="Serial number"
      hide-details
      ></v-text-field>
    </v-row>
    <v-row class="ga-2 mt-7">
      <v-autocomplete
      :items="directoryStore.assetModels"
      item-title="name"
      item-value="id"
      label="Asset Model"
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
      clearable
      no-data-text="No Statuses found"
      hide-details
      chips>
      </v-autocomplete>

      <v-date-input
      label="Warranty date"
      prepend-icon=""
      clearable
      hide-details
      />

    </v-row>

    <v-row class="justify-center mt-9">
      <v-btn width="100%">Add another</v-btn>
    </v-row>
    <v-row class="justify-center mt-9">
      <v-btn>submit</v-btn>
    </v-row>
  </v-form>
</template>