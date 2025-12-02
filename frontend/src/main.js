import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import '@/styles/global.css'
import '@mdi/font/css/materialdesignicons.css'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
   theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          background: '#F4F4F4',
          surface: '#FFFFFF',
          primary: '#4CAF50',
        },
      },
    },
  },
})
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetify)


app.mount('#app')
