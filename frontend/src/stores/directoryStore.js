import { defineStore } from "pinia";
import dictionaryService from "@/services/api/dictionary-service";
import userService from "@/services/api/user-service";

export const useDirectoryStore = defineStore('directory', {
    state: () => ({
        localizations: [],
        statuses: [],
        categories: [],
        vendors: [],
        assetModels: [],
        users: [],

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
                    res = await dictionaryService.getLocalizations()
                    break
                case 'statuses':
                    res = await dictionaryService.getStatuses()
                    break
                case 'categories':
                    res = await dictionaryService.getCategories()
                    break
                case 'vendors':
                    res = await dictionaryService.getVendors()
                    break
                case 'assetModels':
                    res = await dictionaryService.getModels()
                    break
                case 'users':
                    res = await userService.getUsersFromLocalization()
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