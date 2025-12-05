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

  getTasks() {
    return apiAssetClient.get("/tasks");
  },

  logout() {
    return apiAssetClient.get("/auth/logout");
  },
  sendTaskDecision(id, decision) {
    return apiAssetClient.patch(`/task/${id}/${decision}`);
  },

  checkAuth() {
    return apiAssetClient.get("/auth/profile");
  }
}