<script setup>
    import { ref, defineProps } from 'vue';
    defineProps({
        user: Object
    })
</script>

<template>
    <div v-if="user">
        <h1>{{ user.name }}</h1>
        </div>
    
</template>