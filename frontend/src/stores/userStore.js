import { defineStore } from "pinia";
import apiAssetClient from "@/services/apiAssetClient";

export const useUserStore = defineStore('user',{
    state: () => ({
        user: null
    }),

    actions: {
        async fetchUser () {
            try{
                const res = await apiAssetClient.getProfile()
                this.user = res.data.user
            }catch (err){
                console.error("Error during user fetching", err)
                this.user = null
            }
        },

        logout(){
            this.user = null
            return apiAssetClient.logout()
        }
    },

    getters: {
        isLogged: (state) => !!state.user,
        isAdmin: (state) => state.user?.role ==='administrator'
    }
})