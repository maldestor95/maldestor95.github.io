<script setup lang="ts">
import card from "./components/card.vue";
const links = [
  {
    url: "https://maldestor95.github.io/score/",
    name: "Score Board",
  },
  {
    url: "https://maldestor95.github.io/recipeweb/",
    name: "Recette",
  },
  {
    url: "https://maldestor95.github.io/dorf/",
    name: "Dorf Romantik",
  },
];
</script>

<template>
  <div class="absolute top-0 min-h-screen min-w-full">
    <div class="relative background mx-auto"></div>
  </div>
  <card
    v-for="item in links"
    :url="item.url"
    :target-blank="true"
    class="relative z-50 w-80"
  >
    {{ item.name }}
  </card>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.background {
  height: 100vh;
  @apply bg-red-400 mx-auto;
  /* @apply md:bg-[length:200px_100px]; */
  @apply bg-cover;
  /* background-size: 180%; */
  background-image: url("../public/backgroundRobot.png");
  background-repeat: repeat-y;
  background-position: top;
}
</style>
