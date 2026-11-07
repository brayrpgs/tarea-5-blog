# Tarea 5: Blog con Nuxt Content y Comentarios en Utterances

**Curso:** EIF-511 Arquitectura de Información  
**Estudiante:** Brayan Stanley Rosales Pérez  
**Institución:** Universidad Nacional de Costa Rica (UNA)

---

## 🌐 Enlaces del Proyecto

| Recurso | Enlace |
| :--- | :--- |
| 🚀 **Sitio Web Publicado (Hosting)** | [https://gorgeous-speculoos-abb302.netlify.app](https://gorgeous-speculoos-abb302.netlify.app) |
| 💬 **Repositorio Público de Comentarios** | [https://github.com/brayrpgs/blog-comentarios](https://github.com/brayrpgs/blog-comentarios) |
| 💻 **Repositorio Público de Código Fuente** | [https://github.com/brayrpgs/tarea-5-blog](https://github.com/brayrpgs/tarea-5-blog) |
| 🤖 **GitHub App de Utterances** | [https://github.com/apps/utterances](https://github.com/apps/utterances) |

---

## 📋 Resumen de Cumplimiento de la Tarea 5

### 1. Repositorio público de GitHub para comentarios e instalación de Utterances
* Se creó el repositorio público exclusivo para comentarios: **[`brayrpgs/blog-comentarios`](https://github.com/brayrpgs/blog-comentarios)**.
* Se configuró la etiqueta `comments` requerida por Utterances.
* Para habilitar el bot de comentarios, se instala la aplicación de [Utterances](https://github.com/apps/utterances) otorgando acceso al repositorio `brayrpgs/blog-comentarios`.
* **Semillas (Seeds) con GitHub CLI (`gh`):** Se crearon mediante script con `gh issue create` y `gh issue comment` hilos de comentarios reales precargados para cada uno de los artículos del blog.

### 2. Capacidades de comentarios en todas las páginas del blog (Tutorial 2)
* Se integró el componente reactivo `app/components/CommentsUtterances.vue`, que inyecta dinámicamente el widget de Utterances (`https://utteranc.es/client.js`).
* Cada artículo consulta su contenido mediante `queryCollection('blog').path(route.path).first()` en `app/pages/blog/[...slug].vue`.
* El parámetro `issue-term="pathname"` asocia cada ruta (ej. `/blog/principios-solid-typescript`) a su respectivo Issue en GitHub.
* Al navegar de un artículo a otro (usando la botonera de navegación "Siguiente" / "Anterior" o el listado general), el componente observa el cambio de ruta (`watch(() => route.path)`) y recarga limpiamente el hilo correspondiente, garantizando que cada artículo mantiene su propia discusión independiente.

### 3. Publicación del sitio en hosting
* El proyecto fue compilado y publicado exitosamente en **Netlify**:
  * **URL Principal de Producción:** [https://gorgeous-speculoos-abb302.netlify.app](https://gorgeous-speculoos-abb302.netlify.app)
  * **Ruta de Artículos:** [https://gorgeous-speculoos-abb302.netlify.app/blog](https://gorgeous-speculoos-abb302.netlify.app/blog)

### 4. Entrega en archivo ZIP
* Se generó el archivo comprimido `tarea-5-brayan-rosales.zip` que incluye todo el código fuente del proyecto, configuración, artículos en Markdown, hoja de estilos personalizada `app/assets/css/blog.css` y este archivo `README.md`.

---

## 📚 Artículos Disponibles y Semillas de Comentarios

Cada uno de los siguientes artículos cuenta con su propio hilo precargado en GitHub Issues:

1. **Principios SOLID en TypeScript para Sistemas Escalables**  
   * Ruta: `/blog/principios-solid-typescript`  
   * Issue GitHub: [#1 en blog-comentarios](https://github.com/brayrpgs/blog-comentarios/issues/1)
2. **Estrategias de Optimización y Rendimiento en PostgreSQL**  
   * Ruta: `/blog/optimizacion-postgresql`  
   * Issue GitHub: [#2 en blog-comentarios](https://github.com/brayrpgs/blog-comentarios/issues/2)
3. **Arquitectura Limpia en Aplicaciones Frontend con Nuxt y Vue**  
   * Ruta: `/blog/arquitectura-limpia-frontend`  
   * Issue GitHub: [#3 en blog-comentarios](https://github.com/brayrpgs/blog-comentarios/issues/3)
4. **Seguridad Robusta en APIs RESTful con Node.js y OWASP**  
   * Ruta: `/blog/seguridad-apis-rest`  
   * Issue GitHub: [#4 en blog-comentarios](https://github.com/brayrpgs/blog-comentarios/issues/4)
5. **Entornos de Desarrollo Aislados y Reproducibles con Docker Compose**  
   * Ruta: `/blog/contenedores-docker-desarrollo`  
   * Issue GitHub: [#6 en blog-comentarios](https://github.com/brayrpgs/blog-comentarios/issues/6)
6. **Desarrollo Jamstack Eficiente con Nuxt Content y Despliegue Estático**  
   * Ruta: `/blog/jamstack-nuxt-content`  
   * Issue GitHub: [#5 en blog-comentarios](https://github.com/brayrpgs/blog-comentarios/issues/5)

---

## 🛠️ Tecnologías Utilizadas

* **Framework:** Nuxt 4 (`^4.0.3`)
* **CMS de Contenido:** `@nuxt/content` (`^3.16.2`) con SQLite (`better-sqlite3`)
* **Estilos & UI:** Bootstrap 5.3.3, Bootstrap Icons, tipografías Plus Jakarta Sans y JetBrains Mono, hoja de estilos personalizada `blog.css`
* **Sistema de Comentarios:** [Utterances](https://utteranc.es) + GitHub REST / GraphQL API vía `gh`
* **Hosting:** Netlify (Edge CDN)

---

## 🚀 Ejecución en Local

Si desea clonar y ejecutar este proyecto localmente:

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/brayrpgs/tarea-5-blog.git
   cd tarea-5-blog
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Abrir en el navegador: [http://localhost:3000](http://localhost:3000)

4. Generar el sitio estático para producción:
   ```bash
   npm run generate
   ```
   Los archivos listos para despliegue se generarán en `.output/public`.
