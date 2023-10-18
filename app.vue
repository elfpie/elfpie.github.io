<template>
  <br>
  <UInput v-model="searchValue" />
  <br>

  <template v-if="searchValue == ''">
    <div v-for="file in initialItems">
      <img :src="`${baseUrl}${file}`">
      <br>
    </div>
  </template>
  <template v-else>
    <div v-for="file in searchedItems">
    {{ file .item}}
      <img :src="`${baseUrl}${file.item}`">
      <br>
    </div>
  </template>
</template>

<script setup lang="ts">
import Fuse from 'fuse.js';

const baseUrl = "https://raw.githubusercontent.com/snipe/animated-gifs/master/";
const fileList = await fetch("/files.txt")
const response = await fileList.text()
const lines = response.split(/\r?\n/)
const searchValue = ref('')
const listSize = 20

function getMultipleRandom(arr: unknown[], num: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

const options = {}
const fuse = new Fuse(lines, options)

const initialItems = getMultipleRandom(lines, listSize)
const searchedItems = computed(() => {
  return fuse.search(searchValue.value).slice(0, listSize)
})

</script>