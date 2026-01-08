<script setup>
import { ref, onMounted } from 'vue'
import apiAssetClient from '@/services/apiAssetClient';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore()

const columns = [
  { title: 'ID', key: 'it_num' },
  { title: 'SN', key: 'serial_num' },
  { title: 'Model', key: 'model.name' },      
  { title: 'Cat', key: 'category.name' } 
]
const assets = ref([])

onMounted( async () => {
  try{
    const res = await apiAssetClient.getAvailableAssets(userStore.user.id);
    assets.value = res.data
    console.log(assets.value);
  }catch (err) {
    console.error("❌ Error during loading availbe assets:", err);
  }
})

</script>

<template>
    <v-list>
        <v-list-item-title>Create User Placeholder</v-list-item-title>
        <v-list-item-subtitle>In the database, you will create a placeholder for the user to who you will be able to assign 
            devices after their first successful login. The placeholder will change to a regular user.</v-list-item-subtitle>
    </v-list>

<v-stepper flat
:items="['Create Placeholder','Assign Device', 'Finish']"

class="no-shadow">

  <template v-slot:item.1>
    <v-card max-width="500">
        <form @submit.prevent="submitForm">
            <v-form ref="form">
                <v-text-field label="Name" :rules="[v => !!v || 'Required']" />
                <v-text-field  label="Email" :rules="[v => !!v || 'Required']" />
                <v-text-field label="Localization" />

            </v-form>
        </form>
    </v-card>
  </template>

  <template v-slot:item.2>
    <v-row no-gutters>
            <table class="mainTable">
                <tr>
                    <th><input type="checkbox" /></th>
                    <th v-for="(column, i) in columns" :key="i">{{ column.title }}</th>
                </tr>
                <tr v-for="(asset, i) in assets">
                    <td> 
                        <input type="checkbox"></input>
                    </td>
                    <td> {{ asset.it_num }}</td>
                    <td> {{ asset.serial_num }}</td>
                    <td> {{ asset.model.name }}</td>
                    <td> {{ asset.category.name }}</td>
                </tr>
            </table>
    </v-row>
  </template>

</v-stepper>

</template>

<style scoped>
    .deviceTable{
        padding: 10px !important;
        min-height: 400px;
    }
    .mainTable{
        width: 100%;
        border-spacing: 0px;

        tr{
        text-align: center;
        }

        th{
        background: #e6e6e6;
        color: #0b2545;
        border-bottom: 1px solid rgba(15,23,42,0.06);
        font-weight: 600;
        font-size: 0.85rem;
        }

        td{
        font-size: 0.75rem;
        }
    }
</style>