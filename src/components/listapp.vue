<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
         Bienvenue sur la page de Maldestor95
        </h1>

        <p class="subheading font-weight-regular">
          Cette page est a ses débuts et sert de table de matières aux différentes applications
          que je vais expérimenter
        </p>
      </v-col>
      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Pages
        </h2>

        <v-row justify="center">
          <div
            v-for="(eco, i) in ecosystem"
            :key="i"
          >
            <a
            :href="eco.href"
            class="subheading mx-3"
            target="_blank">
              {{ eco.text }}
            </a>
            {{ eco.desc }}
              <v-icon @click="githubclick(eco.github) ">mdi-github</v-icon>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({
    ecosystem: [
      {
        text: 'LISY',
        desc: 'VueJs template for personal github pages ',
        href: 'https://maldestor95.github.io/lisy',
        github: 'https://github.com/maldestor95/lisy',
      },
    ],
  }),
  methods: {
    githubclick(link) {
      window.location.replace(link);
    },
  },
};
</script>
