import apiClient from "./client";

export default {
  getLocalizations() {
    return apiClient.get("/localizations");
  },

  getStatuses() {
    return apiClient.get("/statuses");
  },

  getCategories() {
    return apiClient.get("/categories");
  },

  getVendors() {
    return apiClient.get("/vendors");
  },

  getModels() {
    return apiClient.get("/models");
  }
};