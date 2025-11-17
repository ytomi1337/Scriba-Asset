<script setup>
import { ref } from 'vue'
const visible = ref(false)

import { themeConfig } from '@/config/theme.js'
import logoImage from '@/assets/Holcim_Logo_2021_sRGB.jpg'
import bgImage from '@/assets/bgImg.png'
import bgImage2 from'@/assets/bgimg2.png'

const loginGoogle = () => {
  window.location.href = "http://localhost:3000/auth/google";
}
</script>

<template>
  <v-main>
      <v-container fluid class="fill-height pa-0">
        <v-row no-gutters class="fill-height">
          <v-col class="d-flex align-center justify-center corporate-border-right">
              <v-card flat class="pa-10" max-width="600">
                <div cols="12" md="6" class="text-left mb-10 text-brand"  >
                  <v-img :src="logoImage" max-width="180" class="mx-auto mb-10"></v-img>
                  <h2  > Welcome Back</h2>
                  <p class="text-body-2 text-grey-darken-1 mb-10"> Provide your credentials to get access to your account</p>
                </div>

                <v-text-field type="text" label="Login" variant="outlined" />
                <v-text-field type="password" label="Password" variant="outlined" />

                <v-btn block class="corporate-border"> Login </v-btn>

                <div class="text-center my-2 mt-8">OR</div>

                <v-btn
                  block
                  class="google-btn mt-8" 
                  elevation="2"
                  @click="loginGoogle"
                > 
                    <template #prepend>
                      <img src="@/assets/icons/google.svg" alt="Google" width="20" height="20" />
                    </template>
                    Sign in with Google
                </v-btn>

                <p class="mt-10 text-body-2">*Scriba Asset Management - all rights reserved</p>
              </v-card>
          </v-col>
          <v-col cols="12" md="6"> 
             
            <v-carousel 
              height="100%" :show-arrows="false" 
              cycle hide-delimiter-background :transition-duration="900" crossfade="">
              <v-carousel-item>
                 <v-img
                  :src="bgImage"
                  cover
                  height="100%"
                 />
              </v-carousel-item>
              <v-carousel-item>
                <v-img
                  :src="bgImage2"
                  cover
                  height="100%"
                 />
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
      </v-container>
  </v-main>
</template>
<style scoped>
  .fill-height {
    height: 100vh;
  }
</style>