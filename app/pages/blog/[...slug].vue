<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()

// Recuperar el artículo actual por su ruta
const { data: post } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado', fatal: true })
}

// Configuración de SEO y metadatos
useSeoMeta({
  title: `${post.value.title} | Blog de Brayan Rosales`,
  description: post.value.description
})

// Traer la lista de todos los posts para navegación rápida entre ellos
const { data: allPosts } = await useAsyncData('blog-nav-list', () => {
  return queryCollection('blog')
    .order('date', 'DESC')
    .select('path', 'title')
    .all()
})

const currentIndex = computed(() => {
  if (!allPosts.value) return -1
  return allPosts.value.findIndex(p => p.path === route.path)
})

const prevPost = computed(() => {
  if (!allPosts.value || currentIndex.value <= 0) return null
  return allPosts.value[currentIndex.value - 1]
})

const nextPost = computed(() => {
  if (!allPosts.value || currentIndex.value < 0 || currentIndex.value >= allPosts.value.length - 1) return null
  return allPosts.value[currentIndex.value + 1]
})
</script>

<template>
  <div class="reading-container px-3">
    <!-- Migas de pan / Volver -->
    <nav aria-label="breadcrumb" class="mb-4">
      <NuxtLink to="/blog" class="btn btn-sm btn-outline-secondary rounded-pill px-3 d-inline-flex align-items-center gap-2">
        <i class="bi bi-arrow-left"></i> Volver a todos los artículos
      </NuxtLink>
    </nav>

    <article v-if="post" class="post-article">
      <!-- Encabezado del artículo -->
      <header class="post-header">
        <div class="mb-3">
          <span v-for="tag in post.tags || []" :key="tag" class="tag-badge">
            #{{ tag }}
          </span>
        </div>

        <h1 class="post-title mb-3">
          {{ post.title }}
        </h1>

        <div class="d-flex flex-wrap align-items-center gap-3 post-meta py-3 border-top border-bottom border-light-subtle">
          <div class="d-flex align-items-center gap-2">
            <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 38px; height: 38px;">
              {{ (post?.author || 'B').charAt(0) }}
            </div>
            <div>
              <div class="fw-semibold text-dark">{{ post?.author || 'Brayan Rosales' }}</div>
              <small class="text-secondary">Ingeniería en Sistemas</small>
            </div>
          </div>

          <div class="ms-auto d-flex align-items-center gap-3">
            <span>
              <i class="bi bi-calendar-event me-1"></i>
              {{ post?.date ? new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : '' }}
            </span>
            <span class="badge bg-light text-dark border">
              <i class="bi bi-tag me-1"></i> {{ post.category || 'General' }}
            </span>
          </div>
        </div>
      </header>

      <!-- Imagen destacada -->
      <div v-if="post.image" class="featured-img-container mb-4">
        <img :src="post.image" :alt="post.title" class="featured-img" />
      </div>

      <!-- Cuerpo del artículo renderizado por Nuxt Content -->
      <div class="article-content card border-0 shadow-sm p-4 p-md-5 mb-5 rounded-4">
        <ContentRenderer :value="post" />
      </div>

      <!-- Navegación entre artículos para probar Utterances -->
      <nav class="card border-0 shadow-sm p-4 rounded-4 mb-5 bg-white">
        <div class="d-flex align-items-center gap-2 mb-3">
          <i class="bi bi-arrow-left-right text-primary"></i>
          <h6 class="fw-bold mb-0">Navegación entre Artículos (Prueba de hilos independientes)</h6>
        </div>
        <div class="row g-3">
          <div class="col-sm-6">
            <NuxtLink
              v-if="prevPost"
              :to="prevPost.path"
              class="card h-100 p-3 text-decoration-none border rounded-3 hover-card"
            >
              <small class="text-secondary d-block"><i class="bi bi-arrow-left me-1"></i> Más reciente</small>
              <span class="fw-bold text-dark text-truncate d-block mt-1">{{ prevPost.title }}</span>
            </NuxtLink>
            <div v-else class="text-muted small p-3 bg-light rounded-3">
              Estás en el artículo más reciente.
            </div>
          </div>
          <div class="col-sm-6 text-sm-end">
            <NuxtLink
              v-if="nextPost"
              :to="nextPost.path"
              class="card h-100 p-3 text-decoration-none border rounded-3 hover-card text-sm-end"
            >
              <small class="text-secondary d-block">Anterior <i class="bi bi-arrow-right ms-1"></i></small>
              <span class="fw-bold text-dark text-truncate d-block mt-1">{{ nextPost.title }}</span>
            </NuxtLink>
            <div v-else class="text-muted small p-3 bg-light rounded-3 text-sm-end">
              Estás en el primer artículo publicado.
            </div>
          </div>
        </div>
      </nav>

      <!-- Sección de Comentarios con Utterances -->
      <CommentsUtterances repo="brayrpgs/blog-comentarios" :key="route.path" />
    </article>
  </div>
</template>

<style scoped>
.hover-card {
  transition: all 0.2s ease;
}
.hover-card:hover {
  background-color: #f8fafc;
  border-color: #3b82f6 !important;
  transform: translateY(-2px);
}
</style>
