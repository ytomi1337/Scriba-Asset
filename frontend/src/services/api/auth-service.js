import apiClient from "./client";

export default {
  getProfile() {
    return apiClient.get("/auth/profile");
  },

  logout() {
    return apiClient.get("/auth/logout");
  }
};