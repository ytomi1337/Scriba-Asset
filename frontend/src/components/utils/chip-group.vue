<script setup>
  import { ref, defineEmits } from 'vue';

  const emit = defineEmits(
    ['send-active-chip']
  )

  const tags = [
    'Assets',
    'Phones',
    'Licenses'
  ]

  const activeChip = (item) => {
    emit('send-active-chip', item)
  }
</script>

<template>
  <v-sheet class="mx-3">
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
  </v-sheet>
</template>
