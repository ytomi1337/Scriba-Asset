import apiClient from "./client";

export default {
    getUsers() {
        return apiClient.get("/users");
    },
    getUsersFromLocalization(){
        return apiClient.get('/users/usersFromLocalization')
    },
    createUser(data){
        return apiClient.post('/invite', data)
    },
};