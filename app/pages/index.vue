<script setup lang="ts">
useHead({
  title: 'Inicio | Blog de Arquitectura y Desarrollo Web',
  meta: [
    { name: 'description', content: 'Blog técnico con Nuxt Content y sistema de comentarios Utterances sobre GitHub Issues.' }
  ]
})

const { data: recentPosts } = await useAsyncData('home-recent-posts', () => {
  return queryCollection('blog')
    .order('date', 'DESC')
    .limit(3)
    .select('path', 'title', 'description', 'author', 'date', 'image', 'tags')
    .all()
})
</script>

<template>
  <div class="container">
    <!-- Hero Section -->
    <section class="card border-0 bg-dark text-white shadow-sm p-4 p-md-5 mb-5 rounded-4 overflow-hidden position-relative">
      <div class="position-relative z-1" style="max-width: 720px;">
        <span class="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill fw-semibold mb-3">
          <i class="bi bi-stars me-1"></i> Tarea 5 — EIF-511 Arquitectura de Información
        </span>
        <h1 class="display-5 fw-bold mb-3 lh-sm">
          Blog Técnico con Nuxt Content y Comentarios en GitHub
        </h1>
        <p class="lead text-light opacity-75 mb-4">
          Plataforma estática de alto rendimiento desarrollada con <strong>Nuxt 4</strong>, <strong>Nuxt Content</strong> y comentarios descentralizados con <strong>Utterances</strong> basados en GitHub Issues. Cada artículo mantiene su propio hilo de discusión independiente.
        </p>
        <div class="d-flex flex-wrap gap-3">
          <NuxtLink to="/blog" class="btn btn-primary btn-lg px-4 rounded-3 fw-semibold">
            <i class="bi bi-journal-text me-2"></i> Explorar Artículos
          </NuxtLink>
          <a
            href="https://github.com/brayrpgs/blog-comentarios/issues"
            target="_blank"
            class="btn btn-outline-light btn-lg px-4 rounded-3 fw-semibold"
          >
            <i class="bi bi-github me-2"></i> Ver Issues en GitHub
          </a>
        </div>
      </div>
    </section>

    <!-- Características de la Tarea 5 -->
    <section class="row g-4 mb-5">
      <div class="col-md-4">
        <div class="card h-100 border-0 shadow-sm p-4 rounded-4">
          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="bg-primary text-white rounded-3 p-3">
              <i class="bi bi-chat-left-dots-fill fs-4"></i>
            </div>
            <h5 class="fw-bold mb-0">Hilos Independientes</h5>
          </div>
          <p class="text-secondary mb-0">
            Cada artículo del blog se asocia mediante su <code>pathname</code> a un Issue exclusivo en el repositorio público de comentarios, asegurando que las discusiones no se mezclen.
          </p>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card h-100 border-0 shadow-sm p-4 rounded-4">
          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="bg-success text-white rounded-3 p-3">
              <i class="bi bi-shield-check fs-4"></i>
            </div>
            <h5 class="fw-bold mb-0">Sin Rastreos ni BD</h5>
          </div>
          <p class="text-secondary mb-0">
            A diferencia de sistemas antiguos como Disqus, Utterances no inyecta anuncios, respeta la privacidad y no requiere bases de datos locales: todo vive en GitHub.
          </p>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card h-100 border-0 shadow-sm p-4 rounded-4">
          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="bg-info text-white rounded-3 p-3">
              <i class="bi bi-lightning-charge-fill fs-4"></i>
            </div>
            <h5 class="fw-bold mb-0">Generación Jamstack</h5>
          </div>
          <p class="text-secondary mb-0">
            El blog se compila como sitio estático puro (SSG) distribuido por CDN global a través de Netlify, ofreciendo tiempos de carga prácticamente instantáneos.
          </p>
        </div>
      </div>
    </section>

    <!-- Últimos Artículos -->
    <section class="mb-5">
      <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 class="fw-bold mb-1">
            <i class="bi bi-bookmark-star-fill text-warning me-2"></i>
            Artículos Destacados
          </h2>
          <p class="text-secondary mb-0">Explora las publicaciones técnicas y participa en la sección de comentarios.</p>
        </div>
        <NuxtLink to="/blog" class="btn btn-outline-primary fw-semibold d-none d-sm-inline-flex align-items-center gap-1">
          Ver todos <i class="bi bi-arrow-right"></i>
        </NuxtLink>
      </div>

      <div class="row g-4">
        <div v-for="post in recentPosts" :key="post.path" class="col-md-4">
          <article class="card blog-card h-100 shadow-sm border-0">
            <NuxtLink :to="post.path">
              <img :src="post.image || '/images/blog/jamstack-nuxt.svg'" :alt="post.title" class="blog-card-img" />
            </NuxtLink>
            <div class="card-body p-4 d-flex flex-column">
              <div class="mb-2">
                <span v-for="tag in (post.tags || []).slice(0, 2)" :key="tag" class="tag-badge">
                  #{{ tag }}
                </span>
              </div>
              <h5 class="card-title fw-bold">
                <NuxtLink :to="post.path" class="text-dark text-decoration-none">
                  {{ post.title }}
                </NuxtLink>
              </h5>
              <p class="card-text text-secondary small flex-grow-1">
                {{ post.description }}
              </p>
              <div class="d-flex align-items-center justify-content-between pt-3 mt-3 border-top border-light-subtle">
                <small class="text-muted">
                  <i class="bi bi-calendar3 me-1"></i>
                  {{ post?.date ? new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' }) : '' }}
                </small>
                <NuxtLink :to="post.path" class="text-primary fw-semibold text-decoration-none small">
                  Leer y comentar <i class="bi bi-chevron-right"></i>
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
