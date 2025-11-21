<script setup>
import { ref } from 'vue';
    const notifications = ref([])
</script>

<template>
    <v-menu offset-y
    transition="slide-x-transition">
        <template #activator="{ props }">
            <v-badge
            content="1"
            v-bind="props"
            dot>
                <v-btn
                icon
                aria-label="notifications">
                    <v-icon>mdi-bell-outline</v-icon>
                </v-btn>
            </v-badge>
        </template>

        <template v-if="notifications.length">
            <v-list>
                <v-list-item>
                    hej
                </v-list-item>
            </v-list>
        </template>
        <template v-else>
            ho
        </template>
    </v-menu>
</template>