import apiClient from "./client";

export default {

    getCategoriesStats(){
        return apiClient.get('/assets/stats/categories')
    }
};