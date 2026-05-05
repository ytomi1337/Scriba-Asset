import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationStore = defineStore('notification', () => {
    
  const show = ref(false)
  const text = ref('')
  const color = ref('success')
  const timeout = ref(5000)

  const notify = (message, type = 'success') => {
    text.value = message
    color.value = type
    show.value = true
  }

  const success = (msg) => notify(msg, 'success')
  const error = (msg) => notify(msg, 'error')
  const info = (msg) => notify(msg, 'info')

  return {
    show,
    text,
    color,
    timeout,
    notify,
    success,
    error,
    info,
  }
})