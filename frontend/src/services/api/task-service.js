import apiClient from "./client";

export default {

    getTasks() {
        return apiClient.get("/tasks");
    },
    getLocalTasks(query){
        return apiClient.get(`/tasks/localization`, { params: query })
    },
    updateTaskDecision(id, decision){
        return apiClient.patch(`/tasks/${id}/${decision}`);
    },
    uploadFile(formData) {
        return apiClient.post("/tasks/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    }

};