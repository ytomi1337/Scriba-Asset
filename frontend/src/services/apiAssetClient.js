
import axios from "axios";

console.log(import.meta.env.VITE_API_URL)

const apiAssetClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});



export default {
  // getProfile() {
  //   return apiAssetClient.get("/auth/profile");
  // },

  // getUserAssets(user){
  //   return apiAssetClient.get(`/assets/user/${user}`)
  // },

  // getAllAssets(querry){
    
  //   return apiAssetClient.get(`/assets/`,{ 
  //     params: querry })
  // },
  // getAssetDetails(assetId){
  //   return apiAssetClient.get(`/assets/${assetId}`)
  // },

  getAllPhones(querry){
    
    return apiAssetClient.get(`/phones/`,{ 
      params: querry })
  },

  // getStock(){
  //   return apiAssetClient.get(`/assets/stock/`)
  // },
  // getLastSequence(){
  //   return apiAssetClient.get(`/assets/info/nextseq`)
  // },

  // getTasks() {
  //   return apiAssetClient.get("/tasks");
  // },

  // getLocalTasks(querry) {
  //   return apiAssetClient.get(`/tasks/localization`, { 
  //     params: querry });
  // },

  // getLocalizations(){
  //   return apiAssetClient.get('/localizations')
  // },
  // getStatuses(){
  //   return apiAssetClient.get('/statuses')
  // },
  // getCategories(){
  //   return apiAssetClient.get('/categories')
  // },
  // getVendors(){
  //   return apiAssetClient.get('/vendors')
  // },
  // getModels(){
  //   return apiAssetClient.get('/models')
  // },
  // getUsers(){
  //   return apiAssetClient.get('/users')
  // },
  // getUsersFromLocalization(){
  //   return apiAssetClient.get('/users/usersFromLocalization')
  // },

  // logout() {
  //   return apiAssetClient.get("/auth/logout");
  // },
  // sendTaskDecision(id, decision) {
  //   return apiAssetClient.patch(`/task/${id}/${decision}`);
  // },

  // checkAuth() {
  //   return apiAssetClient.get("/auth/profile");
  // },

  // createUser(payload){
  //   return apiAssetClient.post('/invite', payload)
  // },
  // createAsset(asset){
  //   return apiAssetClient.post('/assets', asset)
  // },
  createPhone(payload){
    return apiAssetClient.post('/phones', payload)
  },
  // assignAsset(payload){
  //   return apiAssetClient.post('/assets/assign', payload)
  // },
  // returnAsset(payload){
  //   return apiAssetClient.post('/assets/return', payload)
  // },
  // uploadFile(formData) {
  //   return apiAssetClient.post('/tasks/upload', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   })
  // }

  
}