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

  getAssets(){
    return apiAssetClient.get(`/assets`)
  },

  getAvailableAssets(){
    return apiAssetClient.get(`/assets/stock`)
  },
  getLastSequence(user_id){
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
  getUsersFromLocalziation(){
    return apiAssetClient.get('/users/usersFromLocalization')
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
    return apiAssetClient.post('/invite', payload)
  },
  createAsset(asset){
    return apiAssetClient.post('/assets', asset)
  },
  assignAsset(payload){
    return apiAssetClient.post('/assets/assign', payload)
  },
}