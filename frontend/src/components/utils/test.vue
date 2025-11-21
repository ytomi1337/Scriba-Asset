<template>
  <div>
    <v-menu
      v-model="menu"
      location="bottom"
      offset-y
      max-width="420"
      
    >
      <template #activator="{ props }">
        <v-badge
          :content="unreadCount"
          color="error"
          v-bind="props"
          overlap
        >
          <v-btn icon aria-label="notifications">
            <v-icon>mdi-bell-outline</v-icon>
          </v-btn>
        </v-badge>
      </template>

      <v-sheet width="420">
        <v-list dense>
          <v-list-item>
            <v-list-item-title class="text-subtitle-1">Powiadomienia</v-list-item-title>
            <v-spacer />
            <v-btn text small @click="markAllSeen" v-if="notifications.length">Oznacz wszystkie jako przeczytane</v-btn>
          </v-list-item>

          <v-divider />

          <template v-if="notifications.length">
            <v-list-item
              v-for="(n, idx) in notifications"
              :key="n.id ?? idx"
              class="notification-item"
              @click="openDetail(n)"
            >
              <v-list-item-avatar>
                <v-icon v-if="n.type === 'task'">mdi-clipboard-list</v-icon>
                <v-icon v-else>mdi-information</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="text-body-1">
                  {{ n.title || `Zadanie #${n.id}` }}
                </v-list-item-title>

                <v-list-item-subtitle class="text-caption">
                  {{ truncate(n.summary || n.message || summaryFromTask(n), 80) }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <div class="text-caption text--secondary">{{ timeAgo(n.created_at) }}</div>
              </v-list-item-action>
            </v-list-item>

            <v-divider />
            <v-list-item>
              <v-btn text small block @click="goToAll">Zobacz wszystkie powiadomienia</v-btn>
            </v-list-item>
          </template>

          <template v-else>
            <v-sheet class="pa-6 text-center">
              <v-img :src="emptyImage" max-width="180" contain />
              <div class="mt-4 text-subtitle-2">Brak nowych powiadomień</div>
              <div class="text-caption text--secondary">Gdy pojawi się nowe zadanie, zobaczysz je tutaj</div>
            </v-sheet>
          </template>
        </v-list>
      </v-sheet>
    </v-menu>

    <!-- DETAIL DIALOG -->
    <v-dialog v-model="dialog" persistent max-width="720">
      <v-card>
        <v-card-title>
          <div>
            <div class="text-h6">{{ activeNotification.title || `Zadanie #${activeNotification.id}` }}</div>
            <div class="text-caption text--secondary">{{ activeNotificationSummary }}</div>
          </div>

          <v-spacer />
          <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>

        <v-card-text>
          <div v-if="taskDetail">
            <v-row>
              <v-col cols="12" md="6">
                <v-list dense>
                  <v-list-item>
                    <v-list-item-title>Nazwa zadania</v-list-item-title>
                    <v-list-item-subtitle>{{ taskDetail.title || 'Przydział sprzętu' }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>Typ</v-list-item-title>
                    <v-list-item-subtitle>{{ taskDetail.task_type }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>Status</v-list-item-title>
                    <v-list-item-subtitle>
                      <v-chip size="small" :color="statusColor(taskDetail.status)" label>
                        {{ taskDetail.status }}
                      </v-chip>
                    </v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>Przydzielony przez</v-list-item-title>
                    <v-list-item-subtitle>{{ taskDetail.assignedBy?.name || '-' }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>Ważne do</v-list-item-title>
                    <v-list-item-subtitle>{{ formatDate(taskDetail.expires_date) || '-' }}</v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title>Plik</v-list-item-title>
                    <v-list-item-subtitle>
                      <a v-if="taskDetail.file" :href="taskDetail.file" target="_blank">Pobierz załącznik</a>
                      <span v-else>-</span>
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-col>

              <v-col cols="12" md="6">
                <div class="mb-2 text-subtitle-2">Lista assetów</div>
                <v-list dense>
                  <v-list-item v-for="link in taskDetail.items" :key="link.asset.id">
                    <v-list-item-avatar>
                      <v-icon>mdi-laptop</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ link.asset.name }}</v-list-item-title>
                      <v-list-item-subtitle class="text-caption">{{ link.asset.serialNumber || link.asset.serial_number || '' }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>

                <v-divider class="my-3" />

                <div class="text-subtitle-2 mb-2">Komentarz</div>
                <v-sheet class="pa-3 bg-surface rounded">
                  {{ taskDetail.comment || '-' }}
                </v-sheet>
              </v-col>
            </v-row>
          </div>

          <div v-else class="text-center pa-6">
            <v-progress-circular indeterminate />
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text color="error" @click="onReject" :disabled="processing">Odrzuć</v-btn>
          <v-btn color="primary" @click="onConfirm" :loading="processing">Potwierdź odbiór</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios' // zakładam axios; zamień jeśli używasz innego klienta

const menu = ref(false)
const dialog = ref(false)
const notifications = ref([])         // surowe powiadomienia (możesz mapować na tasks)
const taskDetail = ref(null)         // szczegóły ładowane do dialogu
const activeNotification = ref({})
const processing = ref(false)
const router = useRouter()

// fallback image (użytkownik załadował plik — używam lokalnej ścieżki)
const emptyImage = '/mnt/data/ddb7b303-9305-4551-ac4c-63ae0a879329.png'

/** Pobierz listę powiadomień (pending tasks) */
async function fetchNotifications() {
  try {
    const res = await axios.get('/api/tasks?assigned_to=me&status=pending')
    // zakładam, że backend zwraca array z task + items relation
    notifications.value = res.data.tasks || res.data || []
  } catch (e) {
    console.error('fetchNotifications error', e)
  }
}

/** Metoda pomocnicza: ile pending */
const unreadCount = computed(() => notifications.value.length)

/** skrócony summary z task */
const summaryFromTask = (t) => {
  if (!t) return ''
  const assetNames = (t.items || []).slice(0,2).map(i => i.asset?.name || i.assetId || '').join(', ')
  return `${t.task_type}: ${assetNames}${(t.items && t.items.length>2) ? ' i więcej...' : ''}`
}

/** Otwórz dialog i pobierz pełne szczegóły zadania (jeśli potrzebne) */
async function openDetail(n) {
  activeNotification.value = n
  menu.value = false
  dialog.value = true
  taskDetail.value = null

  // Jeśli n ma już szczegóły -> użyj ich, inaczej fetch
  if (n.items) {
    taskDetail.value = n
    return
  }

  try {
    const res = await axios.get(`/api/tasks/${n.id}`)
    taskDetail.value = res.data.task || res.data
  } catch (e) {
    console.error('fetch task detail', e)
  }
}

/** Formaty */
function formatDate(d) {
  if (!d) return null
  return new Date(d).toLocaleString()
}
function timeAgo(d){
  if (!d) return ''
  const diff = (Date.now() - new Date(d)) / 1000
  if (diff < 60) return `${Math.floor(diff)}s`
  if (diff < 3600) return `${Math.floor(diff/60)}m`
  if (diff < 86400) return `${Math.floor(diff/3600)}h`
  return `${Math.floor(diff/86400)}d`
}
function truncate(s, n=80){ if(!s) return ''; return s.length>n ? s.slice(0,n-1)+'…' : s }

/** akcje: oznacz wszystkie jako przeczytane (prosty przykład) */
async function markAllSeen(){
  try {
    await axios.post('/api/tasks/mark-all-seen') // endpoint do zaimplementowania
    await fetchNotifications()
  } catch(e) { console.error(e) }
}

/** confirm / reject */
async function onConfirm(){
  if(!taskDetail.value) return
  processing.value = true
  try {
    await axios.patch(`/api/tasks/${taskDetail.value.id}/confirm`)
    dialog.value = false
    await fetchNotifications()
  } catch (e) {
    console.error('confirm error', e)
  } finally {
    processing.value = false
  }
}

async function onReject(){
  if(!taskDetail.value) return
  processing.value = true
  try {
    await axios.patch(`/api/tasks/${taskDetail.value.id}/reject`)
    dialog.value = false
    await fetchNotifications()
  } catch (e) {
    console.error('reject error', e)
  } finally {
    processing.value = false
  }
}

/** gdy user kliknie 'Zobacz wszystkie' */
function goToAll(){
  menu.value = false
  router.push({ name: 'notifications' }) // utwórz route jeśli chcesz pełne widoki
}

/** kolor statusu */
function statusColor(s){
  if (!s) return 'grey'
  if (s.toLowerCase().includes('pending')) return 'orange'
  if (s.toLowerCase().includes('accepted')) return 'green'
  if (s.toLowerCase().includes('rejected') || s.toLowerCase().includes('cancel')) return 'red'
  return 'primary'
}

/** inicjalnie pobierz powiadomienia */
fetchNotifications()
</script>

<style scoped>
.notification-item {
  cursor: pointer;
}
.topbar { border-bottom: 1px solid rgba(0,0,0,0.05); }
.bg-surface { background: var(--v-theme-surface); }
</style>
