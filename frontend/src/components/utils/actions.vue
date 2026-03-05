<script setup>
  import { ref } from 'vue'
  import AddAssetForm from '../forms/AddAssetForm.vue'
  import AddLicenseForm from '../forms/AddLicenseForm.vue'
  import AddPhoneForm from '../forms/AddPhoneForm.vue'
  import AddUserForm from '../forms/AddUserForm.vue'
  import AssignAsset from '../forms/AssignAsset.vue'
  import AssignPhone from '../forms/AssignPhone.vue'

  const dialog = ref(false)
  const selectedForm = ref(null)

  const addItems = [
    ['Asset', 'mdi-plus'],
    ['Phone', 'mdi-phone-plus'],
    ['License', 'mdi-note-plus'],
    ['User', 'mdi-account-plus'],
  ]
  const managementItems = [
    ['Assign Asset', 'mdi-clipboard-check'],
    ['Assign Phone', 'mdi-cellphone-check'],
    ['User Transfer', 'mdi-account-switch'],
    ['Return', 'mdi-arrow-u-left-top'],
  ]

    const openForm = (action) =>{
        selectedForm.value = action
        dialog.value = true
    }

    const getFormComponent = (action) =>{
        switch(action){
            case 'Asset':
                return AddAssetForm
            case 'Phone':
                return AddPhoneForm
            case 'User':
                return AddUserForm
            case 'License':
                return AddLicenseForm
            case 'Assign Asset':
                return AssignAsset
            case 'Assign Phone':
                return AssignPhone
            default:
                return null
        } 
    }
</script>

<template>
    <v-row no-gutters class="ma-4 text-h6">
        Actions
    </v-row>

    <v-list density="compact" class="mx-4">
        <v-list-group value="Add">

            <template v-slot:activator="{ props }">
                <v-list-item
                v-bind="props">
                    <v-list-item-title class="text-">Add New</v-list-item-title>
                </v-list-item>
            </template>

            <v-list-item
            v-for="([title, icon], i) in addItems"
            :key="i"
            :value="title"
            @click="openForm(title)"
            density="compact">
                <template #prepend>
                   <v-icon size="18" :icon="icon"></v-icon>
                </template>
                <v-list-item-title class="text-s">{{ title }}</v-list-item-title>
            </v-list-item>
        </v-list-group>

        <v-list-group value="Management">

            <template v-slot:activator="{ props }">
                <v-list-item
                v-bind="props">
                  <v-list-item-title class="text-s">Asset Management</v-list-item-title>
                </v-list-item>
            </template>

            <v-list-item
            v-for="([title, icon], i) in managementItems"
            :key="i"
            :value="title"
            @click="openForm(title)"
            density="compact">
                 <template #prepend>
                   <v-icon size="18" :icon="icon"></v-icon>
                </template>
                <v-list-item-title class="text-xs">{{ title }}</v-list-item-title>
            </v-list-item>
        </v-list-group>
    </v-list>

    <v-dialog v-model="dialog" max-width="900">
        <v-card>
            <v-card-text>
                <component :is="getFormComponent(selectedForm)" />
            </v-card-text>
        </v-card>

    </v-dialog>
</template>

<style>
    .action-item{
        padding: 0;
        margin: 0;
    }
</style>
