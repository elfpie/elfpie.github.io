<script setup lang="ts">
const { images, searchQuery } = useFile()

const active = useState()
</script>

<template>
  <div>
    <section v-if="images" class="relative h-screen gap-[22px] p-4">

      <UInput color="white" variant="outline" placeholder="Search" v-model="searchQuery" />

      <div class="w-full" :class="{ 'masonry-container': images && images.length }">
        <ul v-if="images && images.length" class="grid grid-cols-1 gap-4 lg:block">
          <li v-for="image in images" ref="mansoryItem" :key="image.pathname"
            class="relative w-full group masonry-item">
            <NuxtLink :to="`/detail/${image.id}`" @click="active = image.id">
              <img v-if="image" width="527" height="430" :src="`${image.pathname}`"
                :class="{ imageEl: image.id == active }"
                class="h-auto w-full max-h-[430px] rounded-md transition-all duration-200 border-image brightness-[.8] hover:brightness-100 will-change-[filter] object-cover">
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>
    <div v-else class="flex items-center space-x-4 z-10">
      <USkeleton class="h-12 w-12 bg-primary-500" :ui="{ rounded: 'rounded-full' }" />
      <div class="space-y-2">
        <USkeleton class="h-4 w-[250px] bg-primary-500" />
        <USkeleton class="h-4 w-[200px] bg-primary-500" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
@media (min-width: 768px) {
  .imageEl {
    view-transition-name: vtn-image;
  }

  .bottom-menu-description {
    view-transition-name: vtn-bottom-menu-description;
  }

  .bottom-menu-button {
    view-transition-name: vtn-bottom-menu-button;
  }

  .container-image {
    background-color: rgba(255, 255, 255, 0.1)
  }

  .container-image:hover {
    background-color: transparent;
  }

  .border-image {
    border-width: 1.15px;
    border-color: rgba(255, 255, 255, 0.1)
  }
}

@media screen and (min-width: 1024px) {
  .masonry-container {
    column-count: 3;
    column-gap: 20px;
    column-fill: balance;
    padding: 2rem;
  }

  .masonry-item,
  .upload {
    display: inline-block;
    padding: 0 0 20px;
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
    break-inside: avoid;
    width: 100%;
  }
}
</style>
