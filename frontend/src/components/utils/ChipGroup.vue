<script setup>
  import { ref, defineEmits } from 'vue';

  const emit = defineEmits(
    ['send-active-chip', 'send-filter-dislpay']
  )

  const tags = [
    'Assets',
    'Phones',
    'Licenses'
  ]
  const activeChip = (item) => {
    emit('send-active-chip', item)
  }

  const showFilter = () => {
    emit('send-filter-dislpay')
  }
</script>

<template>
  <v-row class="mx-3 justify-space-between align-center" no-gutters>
    <v-chip-group
      selected-class="text-primary"
      mandatory
    >
      <v-chip
        v-for="tag in tags"
        :key="tag"
        :text="tag"
        @click="activeChip(tag)"
      ></v-chip>
    </v-chip-group>
    
    <v-btn
    icon
    aria-label="filer"
    flat
    @click="showFilter()">
      <v-icon>mdi-filter</v-icon>
    </v-btn>
    
  </v-row>
</template>
