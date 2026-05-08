import { defineStore } from "pinia";
import authService from "@/services/api/auth-service";

export const useUserStore = defineStore('user',{
    state: () => ({
        user: null
    }),

    actions: {
        async fetchUser () {
            try{
                const res = await authService.getProfile()
                this.user = res.data.user
            }catch (err){
                console.error("Error during user fetching", err)
                this.user = null
            }
        },

        logout(){
            this.user = null
            return authService.logout()
        }
    },

    getters: {
        isLogged: (state) => !!state.user,
        isAdmin: (state) => state.user?.role ==='administrator'
    }
})