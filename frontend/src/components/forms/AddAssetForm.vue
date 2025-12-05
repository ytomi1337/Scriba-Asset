<script setup>
import { ref } from 'vue'

const name = ref('')
const serial = ref('')
const type = ref('')
const valid = ref(false)

const emit = defineEmits(['submit'])

function submitForm() {
  if (!valid.value) return
  emit('submit', {
    name: name.value,
    serial: serial.value,
    type: type.value,
  })
}
</script>

<template>
  <v-form v-model="valid" @submit.prevent="submitForm">
    <v-text-field
      v-model="name"
      label="Asset Name"
      :rules="[v => !!v || 'Required']"
      required
    />

    <v-text-field
      v-model="serial"
      label="Serial Number"
      :rules="[v => !!v || 'Required']"
      required
    />

    <v-select
      v-model="type"
      label="Asset Type"
      :items="['Laptop', 'Monitor', 'Phone', 'Accessory']"
      :rules="[v => !!v || 'Required']"
      required
    />

    <v-btn
      type="submit"
      color="primary"
      class="mt-3"
      block
    >
      Add Asset
    </v-btn>
  </v-form>
</template>
