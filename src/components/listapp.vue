<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
           :src="require('../../public/noun_cogs_170064.svg')"
          class="my-3"
          contain
          height="100"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
         Bienvenue sur la page de Maldestor95
        </h1>

        <p class="subheading font-weight-regular">
          Cette page est à ses débuts et sert de table de matières aux différentes applications
          que je vais expérimenter sur gihub et VueJs
        </p>
      </v-col>
      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Pages
        </h2>

        <v-row justify="center"
            v-for="(eco, i) in ecosystem"
            :key="i"
          >
            <div v-if="eco.menu ==='' ">
              <a
              :href="eco.href"
              class="subheading mx-3"
              target="_blank">
                {{ eco.text }}
              </a>
            </div>
            <div v-else>
              <a

              class="subheading mx-3"
              target="_blank"
              @click="$emit('changeMenu', eco.menu)"
              >
                {{ eco.text }}
              </a>
            </div>
            {{ eco.desc }}
              <v-icon @click="githubclick(eco.github)" v-if="eco.github"
              >mdi-github</v-icon>
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
        menu: '',
      },
      {
        text: 'Recette',
        desc: 'Petit recueil de recettes ',
        href: '',
        github: 'https://github.com/maldestor95/recipebook',
        menu: 'recette',
      },
      {
        text: 'Score Board',
        desc: 'Applet de calcul de points',
        href: '',
        menu: 'scoreboard',
      },
      {
        text: 'Development Wiki',
        desc: 'Applet de calcul de points',
        href: '',
        github: 'https://github.com/maldestor95/dev-wiki',
        menu: 'dev Wiki',
      },
      {
        text: 'Plotly Demo',
        desc: 'Démos de graphiques crée avec plotly',
        href: '',
        menu: 'plotly',
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
