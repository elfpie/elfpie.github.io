// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/fonts",
    "@nuxt/ui",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
  ],

  app: {
    head: {
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Gifs gifs gifs! Gifs? Gifs?",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Elfpie Gifs",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://elfpie.github.io/",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "Gifs gifs gifs! Gifs? Gifs?",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://elfpie.github.io/social-card.jpeg",
        },

        // twitter card
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "Elfpie Gifs",
        },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: "https://elfpie.github.io/",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: "Gifs gifs gifs! Gifs? Gifs?",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "https://elfpie.github.io/social-card.jpeg",
        },
      ],
    },
  },

  nitro: {
    hooks: {
      'dev:reload': () => { require('onnxruntime-node');}
    }
  },

  vite: {
    build: {
      rollupOptions: {
        external: ["sharp"]
      }
    }
  },


  supabase: {
    redirect: false,
    url: "https://beigydskymdtzhfhvlyj.supabase.co",
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlaWd5ZHNreW1kdHpoZmh2bHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM2NzY5OTgsImV4cCI6MjAyOTI1Mjk5OH0.j47DEuwm-OMaTS2CO0IFY6mjD51G0l8jg40bKdUG0Vo"
  },

  ui: {
    icons: ["simple-icons"],
  },

  experimental: {
    viewTransition: true,
  },

  devtools: { enabled: true },

  ssr: false,
});
