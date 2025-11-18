<script setup>
  import { ref } from 'vue'

  const model = ref(null)
  const assets = ref([
    {
        name: 'HP ProBook 450 G6',
        serialnum: '5CD12312DA1',
        status: 'In Use',
        icon: 'mdi-laptop',
        warranty: 'Active',
        recipt_date: '10.12.2025',
    },
    {
        name: 'HP ProBook 450 G7',
        serialnum: '5CD12312DA1',
        status: 'In Use',
        icon: 'mdi-laptop',
        warranty: 'Active',
        recipt_date: '10.12.2025',
    },
    {
        name: 'HP ProBook 450 G6',
        serialnum: '5CD12312DA1',
        status: 'In Use',
        icon: 'mdi-laptop',
        warranty: 'Active',
        recipt_date: '10.12.2025',
    },
    {
        name: 'HP ProBook 450 G6',
        serialnum: '5CD12312DA1',
        status: 'In Use',
        icon: 'mdi-laptop',
        warranty: 'Active',
        recipt_date: '10.12.2025',
    },
    {
        name: 'HP ProBook 450 G6',
        serialnum: '5CD12312DA1',
        status: 'In Use',
        icon: 'mdi-laptop',
        warranty: 'Active',
        recipt_date: '10.12.2025',
    },
  ])

  const assetTest = (i) => {

    console.log(assets.value[i]);
  }
</script>

<template>
  <v-sheet
    class="mx-auto"
    height="100%"
  >
    <v-slide-group
      v-model="model"
      class="p"
      selected-class="card-active"
      show-arrows
    >
      <v-slide-group-item
        v-for="(asset, i) in assets"
        :key="i"
        v-slot="{toggle, selectedClass }"
      >
        <v-card
          :class="['ma-4 card-base', selectedClass]"
          rounded="lg"
          height="325"
          width="225"
          @click="toggle"
        >
          <div class="d-flex flex-column fill-height align-center justify-center"
          @click="assetTest(i)">
            <v-scale-transition>

            </v-scale-transition>
             <v-card-title> {{ asset.name }}</v-card-title>
             <v-avatar size="75"> 
                <v-icon :icon="asset.icon" size="x-large"></v-icon>
             </v-avatar>
             <v-card-subtitle>
                <p>SN: {{ asset.serialnum }}</p>
            </v-card-subtitle>
             <v-card-text>
                <p>Status: {{ asset.status }}</p>
                <p>Warranty: {{ asset.warranty }}</p>
                <p>Recipt Date: {{ asset.recipt_date }}</p>
            </v-card-text>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<style scoped>
    .card-active{
        transform: scale(1.06);
        transition: all 0.3s;
        z-index: 10;
    }
    .card-base{
    border: 2px solid transparent;
    background: 
        linear-gradient(white, white) padding-box,
        linear-gradient(90deg,rgba(149, 193, 46, 0.767) 0%, rgba(4, 187, 241, 1) 50%, rgba(29, 67, 112, 1) 100%);
    }
</style>