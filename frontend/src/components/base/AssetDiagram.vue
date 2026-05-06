<script setup>
  const items = [
    { key: 1, title: 'TypeScript', value: 52.3, color: '#13475c' },
    { key: 2, title: 'Elm', value: 11.6, color: '#006c71' },
    { key: 3, title: 'CoffeeScript', value: 6.2, color: '#008e59' },
    { key: 4, title: 'Civet', value: 3.0, color: '#ffa600' },
    { key: 5, title: 'N/A', value: 26.9, color: '#6662' },
  ]
</script>

<template>
  <div class="d-flex justify-center align-center">
    <v-pie
      :items="items"
      :legend="{ textFormat: '[title] ([value]%)' }"
      :tooltip="{ subtitleFormat: '[value]%' }"
      gap="4"
      hover-scale="0"
      inner-cut="85"
      animation
      hide-slice
    ></v-pie>
  </div>
</template>
