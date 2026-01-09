import { defineStore } from "pinia";
import apiAssetClient from "@/services/apiAssetClient";
import { useRouter } from "vue-router";

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
            apiAssetClient.logout()
            router.push('/login')
        }
    },

    getters: {
        isLogged: (state) => !!state.user,
        isAdmin: (state) => state.user?.role ==='administrator'
    }
})