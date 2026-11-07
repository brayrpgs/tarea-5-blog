<template>
  <div class="d-flex flex-column min-vh-100">
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm py-3">
        <div class="container">
          <NuxtLink class="navbar-brand d-flex align-items-center gap-2" to="/">
            <span class="badge bg-primary p-2 rounded-3">
              <i class="bi bi-journal-code fs-5"></i>
            </span>
            <div class="lh-1">
              <div class="fw-bold fs-5 text-white">Brayan Rosales</div>
              <small class="text-secondary" style="font-size: 0.725rem;">Arquitectura &amp; Desarrollo Web</small>
            </div>
          </NuxtLink>

          <button
            class="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
            aria-controls="navbarMain"
            aria-expanded="false"
            aria-label="Alternar navegación"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarMain">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-2">
              <li class="nav-item">
                <NuxtLink class="nav-link px-3" to="/">
                  <i class="bi bi-house-door me-1"></i> Inicio
                </NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link px-3" to="/blog">
                  <i class="bi bi-journal-text me-1"></i> Artículos
                </NuxtLink>
              </li>
              <li class="nav-item ms-lg-2">
                <a
                  class="btn btn-sm btn-outline-light d-inline-flex align-items-center gap-2 px-3"
                  href="https://github.com/brayrpgs/blog-comentarios"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="bi bi-chat-quote-fill text-warning"></i>
                  <span>Repo Comentarios</span>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="btn btn-sm btn-primary d-inline-flex align-items-center gap-2 px-3"
                  href="https://github.com/brayrpgs/tarea-5-blog"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="bi bi-github"></i>
                  <span>Repo Código</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <main class="flex-grow-1 py-4 py-md-5">
      <slot />
    </main>

    <footer class="bg-dark text-white pt-5 pb-4 mt-auto border-top border-secondary-subtle">
      <div class="container">
        <div class="row g-4 align-items-center">
          <div class="col-md-6 text-center text-md-start">
            <h5 class="fw-bold mb-1">
              <i class="bi bi-code-slash text-primary me-2"></i>
              Blog Técnico — Nuxt Content &amp; Utterances
            </h5>
            <p class="text-secondary small mb-0">
              Evaluación universitaria: <strong>Tarea 5</strong> · Integración de comentarios con GitHub Issues.
            </p>
            <p class="text-secondary small mb-0">
              Curso <strong>EIF-511 Arquitectura de Información</strong> · Universidad Nacional de Costa Rica (UNA).
            </p>
          </div>
          <div class="col-md-6 text-center text-md-end">
            <div class="d-flex justify-content-center justify-content-md-end gap-3 mb-2">
              <NuxtLink to="/" class="text-secondary text-decoration-none small hover-white">Inicio</NuxtLink>
              <span class="text-secondary">·</span>
              <NuxtLink to="/blog" class="text-secondary text-decoration-none small hover-white">Blog</NuxtLink>
              <span class="text-secondary">·</span>
              <a href="https://github.com/brayrpgs" target="_blank" class="text-secondary text-decoration-none small hover-white">GitHub @brayrpgs</a>
            </div>
            <small class="text-muted d-block">
              © 2026 Brayan Stanley Rosales Pérez · Desarrollado con Nuxt 4 &amp; Netlify
            </small>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.hover-white:hover {
  color: #ffffff !important;
}
</style>
