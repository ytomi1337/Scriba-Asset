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

  logout() {
    return apiAssetClient.get("/auth/logout");
  },

  checkAuth() {
    return apiAssetClient.get("/auth/profile");
  }
}