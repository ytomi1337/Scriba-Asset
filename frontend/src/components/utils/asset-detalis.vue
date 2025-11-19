<script setup>
    import { ref, defineProps } from 'vue';
    defineProps({
        asset: Object
    })
</script>

<template>

<v-sheet v-if="asset">
    <h3 class="text-h6 ma-2"> Asset Details</h3>
    <v-row no-gutters>
        <v-col cols="4">
            <v-list>
                <v-list-item
                title="Name:"
                :subtitle="asset.name">
                </v-list-item>
                <v-list-item
                title="Serlia Number:"
                :subtitle="asset.serialnum">
                </v-list-item>
                <v-list-item
                title="IT number:"
                :subtitle="asset.it_num">
                </v-list-item>
                <v-list-item
                title="User"
                :subtitle="asset.userName">
                </v-list-item>
            </v-list>
        </v-col>
        <v-col cols="4">
            <v-list>
                <v-list-item
                title="Category:"
                :subtitle="asset.category">
                </v-list-item>
                <v-list-item
                title="Localization:"
                :subtitle="asset.localization">
                </v-list-item>
                <v-list-item
                title="Status:"
                :subtitle="asset.status">
                </v-list-item>
                <v-list-item
                title="Vendor"
                :subtitle="asset.vendor">
                </v-list-item>
            </v-list>
        </v-col>
        <v-col cols="4">
            <v-list>
                <v-list-item
                title="Recipt Date:"
                :subtitle="asset.recipt_date">
                </v-list-item>
                <v-list-item
                title="Warranty Date:"
                :subtitle="asset.warranty_date">
                </v-list-item>
                <v-list-item
                title="Return Date:"
                :subtitle="asset.return_date">
                </v-list-item>
            </v-list>
        </v-col>
    </v-row>

</v-sheet>
    
</template>