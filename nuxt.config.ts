export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  future: {
    compatibilityVersion: 4
  },
  modules: [
    '@nuxt/content'
  ],
  css: [
    '~/assets/css/blog.css'
  ],
  app: {
    head: {
      title: 'Blog de Arquitectura y Desarrollo Web | Brayan Rosales',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Blog técnico desarrollado con Nuxt Content y comentarios descentralizados con Utterances en GitHub.' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap' }
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js', tagPosition: 'bodyClose' }
      ]
    }
  },
  nitro: {
    prerender: {
      routes: [
        '/',
        '/blog',
        '/blog/principios-solid-typescript',
        '/blog/optimizacion-postgresql',
        '/blog/arquitectura-limpia-frontend',
        '/blog/seguridad-apis-rest',
        '/blog/contenedores-docker-desarrollo',
        '/blog/jamstack-nuxt-content'
      ]
    }
  }
})
