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

  getUserAssets(user_id){
    return apiAssetClient.get(`/assets/${user_id}`)
  },

  getAssets(){
    return apiAssetClient.get(`/assets`)
  },

  getAvailableAssets(user_id){
    return apiAssetClient.get(`/assets/available/${user_id}`)
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
    console.log(payload);
    return apiAssetClient.post('/createUser', payload)
  }
}