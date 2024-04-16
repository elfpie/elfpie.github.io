<script setup lang="ts">
const imageEl = ref<any>()
const magnifierEl = ref<HTMLElement>()
const imageContainer = ref<HTMLElement>()

// filter
const filter = ref(false)
const magnifier = ref(false)
const zoomFactor = ref(1)
const objectsFit = ref(['Contain', 'Cover', 'Scale-down', 'Fill', 'None'])
const objectFitSelected = ref(objectsFit.value[0])

const { images } = useFile()

const { currentIndex, isFirstImg, isLastImg, initSwipe, magnifierImage } = useImageGallery()

const active = useState()
const route = useRoute()
const router = useRouter()

const image: any = computed(() => {
  return images.value!.filter((file: any) => file.id == route.params.slug[0])[0]
})

onKeyStroke('Escape', () => {
  router.push('/')
})

onKeyStroke('ArrowLeft', () => {
  if (isFirstImg.value)
    router.push('/')
  else
    router.push(`/detail/${images.value![currentIndex.value - 1].id}`)
})

onKeyStroke('ArrowRight', () => {
  if (isLastImg.value)
    router.push('/')
  else
    router.push(`/detail/${images.value![currentIndex.value + 1].id}`)
})

onMounted(() => {
  initSwipe(imageEl)
})
</script>

<template>
  <div v-if="image">
    <!-- background -->
    <div class="absolute inset-0 w-full h-full">
      <img :src="`${image.pathname}`"
        class="object-cover w-full h-full blur-[70px] brightness-[.2] will-change-[filter]" alt="">
    </div>

    <UContainer class="overflow-x-hidden overflow-y-hidden relative flex items-center justify-center">
      <div class="h-full w-full max-w-7xl flex items-center justify-center relative mx-auto">
        <!-- Bottom menu -->
        <div :class="{ '-translate-x-[100px]': filter }"
          class="transition-all duration-200 overflow-hidden pt-8 flex items-center justify-center w-full h-screen relative">
          <div class="flex items-center justify-center md:justify-between gap-x-4 w-full">
            <!-- previous image if not the first image -->
            <UTooltip v-if="!isFirstImg" text="Previous" :shortcuts="['←']">
              <UButton variant="ghost" color="gray" :to="`/detail/${images![currentIndex - 1].id}`" size="lg"
                icon="i-heroicons-chevron-left" class="hidden md:flex ml-4" aria-label="Go to previous image"
                @click="active == image.id" />
            </UTooltip>

            <div v-else class="flex group">
              <!-- back to gallery if first movie -->
              <UTooltip text="Back to gallery" :shortcuts="['Esc']">
                <UButton to="/" size="xl" color="gray" variant="ghost"
                  class="back hidden md:flex ml-4 transition-colors duration-200" aria-label="Back to gallery"
                  @click="active == image.id">
                  <UIcon name="i-heroicons-rectangle-group-20-solid" class="w-6 h-6" />
                </UButton>
              </UTooltip>
            </div>

            <!-- image -->
            <div class="relative flex items-center justify-center xl:m-16">
              <div ref="imageContainer">
                <div class="group">
                  <p>{{ image.name }}</p>
                  <img v-if="image" ref="imageEl" :src="`${image.pathname}`" :alt="image.pathname"
                    class="rounded object-contain transition-all duration-200 block"
                    :class="[{ imageEl: route.params.slug[0] == image.id }, filter ? 'w-[80%] ml-[12px]' : 'w-full']"
                    :style="`filter: object-fit:${objectFitSelected.toLowerCase()};`"
                    @mousemove="magnifier ? magnifierImage($event, imageContainer, imageEl, magnifierEl!, zoomFactor) : () => { }">
                  <div v-if="magnifier" ref="magnifierEl"
                    class="w-[100px] h-[100px] absolute border border-gray-200 pointer-events-none rounded-full block opacity-0 group-hover:opacity-100 transition-opacity duration-200 "
                    :style="`background-image: url('${image.pathname}'`" />
                </div>
              </div>
            </div>

            <!-- next image (if not the last image) -->
            <UTooltip v-if="!isLastImg" text="Next" :shortcuts="['→']">
              <UButton variant="ghost" color="gray" :to="`/detail/${images![currentIndex + 1].id}`" size="lg"
                icon="i-heroicons-chevron-right" :ui="{ rounded: 'rounded-full' }" class="hidden md:flex mr-4"
                aria-label="Go to next image" @click="active == image.id" />
            </UTooltip>

            <!-- back to gallery if last image -->
            <UTooltip v-else text="Back to gallery" :shortcuts="['Esc']">
              <div class="flex">
                <UButton variant="ghost" color="gray" to="/" size="xl"
                  class="back hidden md:flex mr-4 transition-colors duration-200" aria-label="Back to gallery"
                  @click="active == image.id">
                  <UIcon name="i-heroicons-rectangle-group-20-solid" class="w-6 h-6" />
                </UButton>
              </div>
            </UTooltip>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<style scoped lang="postcss">
@media (min-width: 768px) {
  .imageEl {
    view-transition-name: vtn-image;
  }

  .bottom-menu {
    view-transition-name: vtn-bottom-menu;
  }

  .bottom-menu-description {
    view-transition-name: vtn-bottom-menu-description;
  }

  .bottom-menu-button {
    view-transition-name: vtn-bottom-menu-button;
  }

  .back {
    view-transition-name: vtn-back-button;
  }
}
</style>

<style>
@keyframes slide-to-left {
  to {
    transform: translateX(0px);
  }
}

::view-transition-old(vtn-bottom-menu-description) {
  animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
  width: auto;
  opacity: 0;
}
</style>
