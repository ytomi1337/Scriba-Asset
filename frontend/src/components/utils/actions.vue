<script setup>
import { ref, computed, defineEmits } from 'vue'
import { useUserStore } from '@/stores/userStore'

const emit = defineEmits(['created'])
const userStore = useUserStore()

import AddAssetForm from '../forms/AddAssetForm.vue'
import AddLicenseForm from '../forms/AddLicenseForm.vue'
import AddPhoneForm from '../forms/AddPhoneForm.vue'
import AddUserForm from '../forms/AddUserForm.vue'
import AssignAsset from '../forms/AssignAsset.vue'
import AssignPhone from '../forms/AssignPhone.vue'
import ReturnAsset from '../forms/ReturnAsset.vue'


const dialog = ref(false)
const selectedAction = ref(null)


const menuItems = [
  {
    title: 'Add New',
    icon: 'mdi-plus',
    reqAdmin: true,
    children: [
      { title: 'Asset', icon: 'mdi-plus' },
      { title: 'Phone', icon: 'mdi-phone-plus' },
      { title: 'License', icon: 'mdi-note-plus' },
      { title: 'User', icon: 'mdi-account-plus' },
    ],
  },
  {
    title: 'Asset Management',
    icon: 'mdi-cog',
    children: [
      { title: 'Assign Asset', icon: 'mdi-clipboard-check', reqAdmin: true },
      { title: 'Assign Phone', icon: 'mdi-cellphone-check', reqAdmin: true },
      { title: 'Return Asset', icon: 'mdi-arrow-u-left-top' },
      { title: 'User Transfer', icon: 'mdi-account-switch' },
    ],
  },
]


const visibleNav = computed(() => {
  return menuItems.filter(i => !i.reqAdmin || userStore.isAdmin)
})


const filterByRole = (items = []) => {
  return items.filter(i => !i.reqAdmin || userStore.isAdmin)
}


const openForm = (title) => {
  selectedAction.value = title
  dialog.value = true
}


const formMap = {
  Asset: AddAssetForm,
  Phone: AddPhoneForm,
  User: AddUserForm,
  License: AddLicenseForm,
  'Assign Asset': AssignAsset,
  'Assign Phone': AssignPhone,
  'Return Asset': ReturnAsset,
}

const currentForm = computed(() => {
  return formMap[selectedAction.value] || null
})
</script>

<template>
  <div class="text-center">
    <v-btn>
      Actions

      <v-menu activator="parent"
       content-class="custom-menu">
        <v-list density="compact">

          <v-list-item
            v-for="(i, iIndex) in visibleNav"
            :key="iIndex"
          >
            <template #prepend>
              <v-icon :icon="i.icon" size="small" />
            </template>

            <v-list-item-title>{{ i.title }}</v-list-item-title>

            <template v-if="i.children" #append>
              <v-icon icon="mdi-menu-right" size="x-small" />
            </template>

            <!-- 🔹 LEVEL 2 -->
            <v-menu
              v-if="i.children"
              activator="parent"
              open-on-click
              submenu
              content-class="custom-menu"
            >
              <v-list>

                <v-list-item
                  v-for="(j, jIndex) in filterByRole(i.children)"
                  :key="jIndex"
                  @click.stop="openForm(j.title)"
                >
                  <template #prepend>
                    <v-icon :icon="j.icon" size="small" />
                  </template>

                  <v-list-item-title>{{ j.title }}</v-list-item-title>
                </v-list-item>

              </v-list>
            </v-menu>

          </v-list-item>

        </v-list>
      </v-menu>
    </v-btn>

    <!-- 🔥 DIALOG -->
    <v-dialog v-model="dialog" max-width="900">
      <v-card>
        <v-card-title>{{ selectedAction }}</v-card-title>

        <v-card-text>
          <component :is="getFormComponent()"
           @close="dialog = false" />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.custom-menu {
  min-width: 160px ;
  padding: 4px ;
}

.custom-menu .v-list {
  padding: 4px ;
}

.custom-menu .v-list-item {
  min-height: 28px ;
  padding: 0 8px ;
}

.custom-menu .v-list-item-title {
  font-size: 13px;
}

.custom-menu .v-icon {
  font-size: 16px;
}</style>