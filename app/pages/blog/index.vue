<script setup lang="ts">
import { ref, computed } from 'vue'

useHead({
  title: 'Artículos & Publicaciones | Blog de Brayan Rosales',
  meta: [
    { name: 'description', content: 'Listado completo de artículos técnicos sobre arquitectura de software, bases de datos y desarrollo web con comentarios Utterances.' }
  ]
})

const { data: posts } = await useAsyncData('blog-all-posts', () => {
  return queryCollection('blog')
    .order('date', 'DESC')
    .all()
})

const selectedTag = ref<string>('todos')

const allTags = computed(() => {
  const set = new Set<string>()
  if (posts.value && Array.isArray(posts.value)) {
    posts.value.forEach(p => {
      if (Array.isArray(p.tags)) {
        p.tags.forEach(t => set.add(String(t)))
      }
    })
  }
  return ['todos', ...Array.from(set)]
})

const filteredPosts = computed(() => {
  if (!posts.value || !Array.isArray(posts.value)) return []
  if (selectedTag.value === 'todos') return posts.value
  return posts.value.filter(p => Array.isArray(p.tags) && p.tags.includes(selectedTag.value))
})

function formatDate(val: any) {
  if (!val) return ''
  try {
    return new Date(val).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return String(val)
  }
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center mb-5 text-center">
      <div class="col-lg-8">
        <span class="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill fw-semibold mb-2">
          <i class="bi bi-journal-richtext me-1"></i> Tutorial 2 + Tarea 5
        </span>
        <h1 class="display-6 fw-bold mb-3">Artículos de Arquitectura y Desarrollo</h1>
        <p class="lead text-secondary">
          Explora los artículos construidos con <strong>Nuxt Content</strong>. Navega entre ellos para verificar que cada uno cuenta con su propio hilo de comentarios independiente gestionado con <strong>Utterances</strong>.
        </p>

        <!-- Filtros por etiqueta -->
        <div class="d-flex flex-wrap justify-content-center gap-2 mt-4">
          <button
            v-for="tag in allTags"
            :key="tag"
            type="button"
            class="btn btn-sm rounded-pill px-3"
            :class="selectedTag === tag ? 'btn-primary' : 'btn-outline-secondary'"
            @click="selectedTag = tag"
          >
            {{ tag === 'todos' ? 'Todas las etiquetas' : '#' + tag }}
          </button>
        </div>
      </div>
    </div>

    <!-- Grid de Artículos -->
    <div class="row g-4">
      <div v-for="post in filteredPosts" :key="post.path" class="col-md-6 col-lg-4">
        <article class="card blog-card h-100 shadow-sm border-0">
          <NuxtLink :to="post.path">
            <img :src="post.image || '/images/blog/jamstack-nuxt.svg'" :alt="post.title" class="blog-card-img" />
          </NuxtLink>
          <div class="card-body p-4 d-flex flex-column">
            <div class="mb-2">
              <span v-for="tag in (post.tags || [])" :key="tag" class="tag-badge">
                #{{ tag }}
              </span>
            </div>

            <h5 class="card-title fw-bold mt-1">
              <NuxtLink :to="post.path" class="text-dark text-decoration-none">
                {{ post.title }}
              </NuxtLink>
            </h5>

            <p class="card-text text-secondary small flex-grow-1">
              {{ post.description }}
            </p>

            <div class="pt-3 mt-3 border-top border-light-subtle">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center gap-2">
                  <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 28px; height: 28px; font-size: 0.75rem;">
                    {{ (post.author || 'B').charAt(0) }}
                  </div>
                  <small class="text-dark fw-semibold">{{ post.author || 'Brayan Rosales' }}</small>
                </div>
                <small class="text-muted">
                  <i class="bi bi-calendar3 me-1"></i>
                  {{ formatDate(post.date) }}
                </small>
              </div>

              <div class="mt-3 text-end">
                <NuxtLink :to="post.path" class="btn btn-sm btn-outline-primary w-100 rounded-3 fw-semibold">
                  Ver artículo &amp; Comentarios <i class="bi bi-chat-dots ms-1"></i>
                </NuxtLink>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
