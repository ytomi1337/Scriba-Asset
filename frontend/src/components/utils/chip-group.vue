<template>
  <v-sheet class="mx-3 my-0 pa-0">
    <v-chip-group
      selected-class="text-primary"
      mandatory
    >
      <v-chip
        v-for="tag in tags"
        :key="tag"
        :text="tag"
      ></v-chip>
    </v-chip-group>
  </v-sheet>
</template>
<script setup>
  const tags = [
    'Assets',
    'Licenses'
  ]
</script>