import AssignAsset from "@/components/forms/AssignAsset.vue";
import axios from "axios";

const apiAssetClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});



export default {
  getProfile() {
    return apiAssetClient.get("/auth/profile");
  },

  getUserAssets(){
    return apiAssetClient.get(`/assets/user`)
  },

  getAllAssets(querry){
    
    return apiAssetClient.get(`/assets/`,{ 
      params: querry })
  },

  getStock(){
    return apiAssetClient.get(`/assets/stock/`)
  },
  getLastSequence(){
    return apiAssetClient.get(`/assets/info/nextseq`)
  },

  getTasks() {
    return apiAssetClient.get("/tasks");
  },

  getLocalizations(){
    return apiAssetClient.get('/localizations')
  },
  getStatuses(){
    return apiAssetClient.get('/statuses')
  },
  getCategories(){
    return apiAssetClient.get('/categories')
  },
  getVendors(){
    return apiAssetClient.get('/vendors')
  },
  getModels(){
    return apiAssetClient.get('/models')
  },
  getUsers(){
    return apiAssetClient.get('/users')
  },

  logout() {
    return apiAssetClient.get("/auth/logout");
  },
  sendTaskDecision(id, decision) {
    return apiAssetClient.patch(`/task/${id}/${decision}`);
  },

  checkAuth() {
    return apiAssetClient.get("/auth/profile");
  },

  createUser(payload){
    return apiAssetClient.post('/createUser', payload)
  },
  createAsset(asset){
    return apiAssetClient.post('/assets', asset)
  },
  createPhone(payload){
    return apiAssetClient.post('/phones', payload)
  },
  assignAsset(payload){
    return apiAssetClient.post('/assets/assign', payload)
  },
}