<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'

const props = withDefaults(defineProps<{
  repo: string
  theme?: string
  issueTerm?: string
}>(), {
  theme: 'github-light',
  issueTerm: 'pathname'
})

const container = ref<HTMLElement | null>(null)
const route = useRoute()
const isLoading = ref(true)

function loadComments() {
  if (!container.value) return
  isLoading.value = true
  container.value.innerHTML = ''

  const script = document.createElement('script')
  script.src = 'https://utteranc.es/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('repo', props.repo)
  script.setAttribute('issue-term', props.issueTerm)
  script.setAttribute('label', 'comments')
  script.setAttribute('theme', props.theme)
  
  script.onload = () => {
    isLoading.value = false
  }
  
  // Timeout fallback in case onload doesn't fire for the injected iframe
  setTimeout(() => {
    isLoading.value = false
  }, 1500)

  container.value.appendChild(script)
}

onMounted(() => {
  nextTick(() => {
    loadComments()
  })
})

watch(() => route.path, () => {
  nextTick(() => {
    loadComments()
  })
})
</script>

<template>
  <div class="utterances-wrapper card border-0 shadow-sm p-4 p-md-5 my-5">
    <div class="d-flex flex-wrap align-items-center justify-content-between pb-3 mb-4 border-bottom">
      <div class="d-flex align-items-center gap-2">
        <i class="bi bi-chat-square-text-fill text-primary fs-4"></i>
        <h4 class="mb-0 fw-bold">Comentarios y Discusión</h4>
      </div>
      <div class="d-flex align-items-center gap-2 mt-2 mt-sm-0">
        <span class="badge bg-dark-subtle text-dark border">
          <i class="bi bi-github me-1"></i>
          {{ repo }}
        </span>
        <span class="badge bg-secondary-subtle text-secondary border">
          <i class="bi bi-link-45deg me-1"></i>
          {{ issueTerm }}
        </span>
      </div>
    </div>

    <p class="text-secondary small mb-3">
      <i class="bi bi-info-circle me-1"></i>
      Los comentarios se gestionan a través de <strong>Utterances</strong> y se almacenan como issues en GitHub.
      Inicia sesión con tu cuenta de GitHub para participar.
    </p>

    <div v-if="isLoading" class="text-center py-4 text-muted">
      <div class="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
      <span class="small">Cargando comentarios desde GitHub...</span>
    </div>

    <!-- Contenedor donde Utterances inyecta el iframe -->
    <div ref="container" class="comments-container min-vh-20"></div>
  </div>
</template>

<style scoped>
.utterances-wrapper {
  background: var(--bg-card, #ffffff);
  border-radius: 16px;
}
.comments-container :deep(.utterances) {
  max-width: 100%;
}
</style>
