// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  compatibilityDate: "2025-01-17",
  runtimeConfig: {
    public: {
      apiHost: process.env.API_HOST || 'http://localhost', // Default value for development
    },
  },
})