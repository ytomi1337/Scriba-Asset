import apiClient from "./client";

export default {

    getAssets(query){
        return apiClient.get('/assets/', { params: query })
    },
    getAsset(id){
        return apiClient.get(`/assets/${id}`)
    },
    getUserAssets(id){
        return apiClient.get(`/assets/user/${id}`)
    },
    getStock(){
        return apiClient.get('/assets/stock')
    },
    getNextSequence(){
        return apiAssetClient.get(`/assets/info/nextseq`)
    },
    createAsset(data){
        return apiClient.post("/assets", data);
    },
    assignAsset(data){
        return apiClient.post("/assets/assign", data);
    },
    returnAsset(data){
        return apiClient.post("/assets/return", data);
    }

};