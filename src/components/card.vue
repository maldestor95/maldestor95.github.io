<template>
  <div
    class="container bg-white bg-opacity-30 h-20 mx-auto rounded-lg shadow-lg my-4 flex justify-around"
  >
    <a class="content-center text-white" :href="url" :target="targetBlank ? 'blank' : ''">
      <slot>Test</slot>
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps<{ url: string; targetBlank?: true }>();
</script>

<style scoped></style>
