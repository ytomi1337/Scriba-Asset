<script setup>
import logoImage from '@/assets/Holcim_Logo_2021_sRGB.jpg'
import { useUserStore } from '@/stores/userStore'
import { computed } from 'vue'

const userStore = useUserStore()

const navItems = [
    { title: "Admin Panel", icon: "mdi-view-dashboard", reqAdmin: true, to: { name: 'admin-panel'}},
    { title: "User Panel", icon: "mdi-clipboard-account", reqAdmin: false, to: { name: 'profile'} },
    { title: "Documents", icon: "mdi-file-document", reqAdmin: false },
]

const items = [
    { title: "Settings", icon: "mdi-cog" },
    { title: "Helping Center", icon: "mdi-help-rhombus" },
]

const visibleNav = computed(() =>{
    return navItems.filter(n => !n.reqAdmin || userStore.isAdmin)
})
</script>
<template>
    <nav>
        <v-navigation-drawer permanent class="corporate-border-right">
            <v-container class="mb-10 mt-2">
                <v-img :src="logoImage" max-width="180"></v-img>   
            </v-container>
            <v-list>
                <v-list-item 
                v-for="(navItem, i) in visibleNav"
                :key="i"
                :value="navItem"
                :to="navItem.to"
                link
                >

                <template v-slot:prepend>
                    <v-icon :icon="navItem.icon"></v-icon>
                </template>

                <v-list-item-title v-text="navItem.title"></v-list-item-title>
                </v-list-item>
            </v-list>
            <v-divider /> 
            <v-list>
                <v-list-item 
                v-for="(item, i) in items"
                :key="i"
                :value="item"
                >

                <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                </template>

                <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item>
            </v-list>    
        </v-navigation-drawer>
    </nav>
</template>

