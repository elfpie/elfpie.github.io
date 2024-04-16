<script setup lang="ts">
useHead({
  link: [
    { rel: 'icon', href: '/favicon.ico' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
})

const title = 'Elfpie Gifs'
const description = 'Gifs gifs gifs! Gifs? Gifs?'

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogSiteName: 'Gifs gifs gifs! Gifs? Gifs?',
  ogImage: 'https://elfpie.github.io/social-card.jpeg',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="bg-black min-h-[100dvh] overflow-x-hidden relative" :class="{ 'flex flex-col md:block': $router.currentRoute.value.fullPath !== '/' }">
    <UNotifications />
    <NuxtPage />
    <ThumbnailList :class="$router.currentRoute.value.fullPath !== '/' ? 'opacity-100 z-[9999]' : 'opacity-0 z-[-1]'" />
  </div>
</template>
