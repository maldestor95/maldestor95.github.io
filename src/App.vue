<template>
  <v-app>
    <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
            Maldestor95
        </div>
        <v-spacer></v-spacer>
        <mainMenu v-model='menulist' @choice="menu=$event"/>
    </v-app-bar>

    <v-main>
        <listApp v-if="menu==='home'"/>
        <recetteApp v-if="menu==='recette'"/>
        <devWiki v-if="menu==='dev Wiki'"/>
        <scoreBoard v-if="menu==='scoreBoard'"/>
        <plotly v-if="menu==='plotly'"/>
    </v-main>
</v-app>
</template>

<script>
import mainMenu from './components/menu.vue';
import listApp from './components/listapp.vue';
import recetteApp from './features/recette/recettepage.vue';
import devWiki from './features/devwiki/devwiki.vue';
import scoreBoard from './features/pointscounter/scoreBoard.vue';
import plotly from './features/plotly/plotly.vue';

export default {
  name: 'App',
  components: {
    mainMenu,
    listApp,
    recetteApp,
    devWiki,
    scoreBoard,
    plotly,
  },

  data: () => ({
    menu: 'plotly',
    menulist: [
      { title: 'home' },
      { title: 'recette' },
      { title: 'dev Wiki' },
      { title: 'scoreBoard' },
      { title: 'plotly' },
    ],
  }),
};
</script>
