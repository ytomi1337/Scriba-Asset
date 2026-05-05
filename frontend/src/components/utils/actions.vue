<script setup>
import { ref, computed, markRaw } from 'vue'
import { useUserStore } from '@/stores/userStore'

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
      { title: 'Asset', icon: 'mdi-plus', component: markRaw(AddAssetForm) },
      { title: 'Phone', icon: 'mdi-phone-plus', component: AddPhoneForm },
      { title: 'License', icon: 'mdi-note-plus', component: AddLicenseForm },
      { title: 'User', icon: 'mdi-account-plus', component: markRaw(AddUserForm) },
    ],
  },
  {
    title: 'Asset Management',
    icon: 'mdi-cog',
    children: [
      { title: 'Assign Asset', icon: 'mdi-clipboard-check', component: markRaw(AssignAsset), reqAdmin: true },
      { title: 'Assign Phone', icon: 'mdi-cellphone-check', component: AssignPhone, reqAdmin: true },
      { title: 'Return Asset', icon: 'mdi-arrow-u-left-top', component: markRaw(ReturnAsset)},
      { title: 'User Transfer', icon: 'mdi-account-switch' },
    ],
  },
]

const filterMenu = (items = []) => {
  return items
    .filter(i => !i.reqAdmin || userStore.isAdmin)
    .map(i => ({
      ...i,
      children: i.children ? filterMenu(i.children) : undefined,
    }))
}

const visibleNav = computed(() => filterMenu(menuItems))

const openForm = (item) => {
  if (!item.component) return
  selectedAction.value = item
  dialog.value = true
}

</script>

<template>
  <div class="text-center">
    <v-btn>
      Actions

      <v-menu activator="parent" content-class="custom-menu">
        <v-list density="compact">


          <v-list-item
            v-for="i in visibleNav"
            :key="i.title"
          >
            <template #prepend>
              <v-icon :icon="i.icon" size="small" />
            </template>

            <v-list-item-title>{{ i.title }}</v-list-item-title>

            <template v-if="i.children" #append>
              <v-icon icon="mdi-menu-right" size="x-small" />
            </template>

            <v-menu
              v-if="i.children"
              activator="parent"
              submenu
              content-class="custom-menu"
            >
              <v-list>

                <v-list-item
                  v-for="j in i.children"
                  :key="j.title"
                  @click="openForm(j)"
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

    <v-dialog v-model="dialog" max-width="600">
        <component
        :is="selectedAction?.component"
        @close="dialog = false"
        />
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