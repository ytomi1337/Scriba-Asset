<script setup>

  import { computed, onMounted } from 'vue';
  import { useAssetStore } from '@/stores/assetStore';

  const assetStore = useAssetStore()

  onMounted( async () => {
    await assetStore.fetchCategoryStats()
  })

  const items = computed(() => {
    return assetStore.categoryStats.map((item, index) => ({
      key: index,
      title: item.category,
      value: Number(item.count),
      color: getColor(index)
    }))
  })
  console.log(items);
  const colors = ['#94c12e', '#04bbf1', '#1d4370', '#ffa600', '#666']

  function getColor(index) {
    return colors[index % colors.length]
  }

</script>

<template>
 <div class="d-flex justify-center align-center">
    <v-pie
      v-if="items.length"
      :items="items"
      :legend="{ textFormat: '[title] ([value])' }"
      :tooltip="{ subtitleFormat: '[value]' }"
      gap="4"
      hover-scale="0"
      inner-cut="70"
      animation
      hide-slice
    />

    <div v-else>
      Brak danych
    </div>
  </div>
</template>
