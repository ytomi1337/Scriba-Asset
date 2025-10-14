<script setup>
import api from "@/services/apiAssetClient";
import { useRouter } from "vue-router";
import { ref, onMounted} from "vue";

const user =  ref(null);
const router = useRouter();

onMounted( async () => {
  try {
    const res = await api.getProfile();
    console.log("✅ Zalogowana pomyslnie");
    user.value = res.data.user
    console.log(res.data);
  } catch (err) {
    console.error("❌ Błąd zaczytania danych uytkownika:", err);
  }
});

const handleLogout = async () => {
    try {
        await api.logout();
        router.push('/login')
    }catch(err){
        console.log('Error on Logout attempt', err)
    }
}
</script>

<template>
    <div v-if="user">
    <h1>Witaj {{ user.name }}</h1>
    </div>

    <button @click="handleLogout"> Wyloguj </button>
</template>