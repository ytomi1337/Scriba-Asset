import { defineStore } from "pinia";
import apiAssetClient from "@/services/apiAssetClient";

export const useDircetoryStore = defineStore('directory', {
    state: () => ({
        localizations: [],
        statuses: [],
        categories: [],
        vendors: [],
        assetModels: [],

        loaded: {
            localizations: false,
            statuses: false,
            categories: false,
            vendors: false,
            assetModels: false,
        }
    }),

    actions: {
        async fetch(type) {
            if(this.loaded[type]) return

            let res

            switch (type){
                case 'localizations':
                    res = await apiAssetClient.getLocalizations()
                    break
                case 'statuses':
                    res = await apiAssetClient.getStatuses()
                    break
                case 'categories':
                    res = await apiAssetClient.getCategories()
                    break
                case 'vendors':
                    res = await apiAssetClient.getVendors()
                    break
                case 'assetModels':
                    res = await apiAssetClient.getModels()
                    break
                default:
                    throw new Error(`Unknow dictionary type: ${type}`)
            }

            this[type] = res.data
            this.loaded[type] = true
        },

        async preloadAll() {
            await Promise.all([
                this.fetch('localizations'),
            ])
        }
    }
})