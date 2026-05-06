<script setup>

    defineProps({
        asset:{
            type: Object,
            required: true
        }
    })
</script>

<template>

<RouterLink
  :to="{ name: 'asset-details', params: { id: asset.id }}"
>
  <v-btn size="small" variant="text">
    Details
  </v-btn>
</RouterLink>
</template>