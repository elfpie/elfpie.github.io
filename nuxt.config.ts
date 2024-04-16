// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxthub/core", "@nuxt/fonts", "@nuxt/ui", "@vueuse/nuxt"],

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

  hub: {
    blob: true,
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
