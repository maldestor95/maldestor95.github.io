<template>
  <v-app>
    <v-app-bar app color="primary" dark>
        <div class="navBarText"
          @click="menu='home'"
        >
            Maldestor95
        </div>
        <v-spacer></v-spacer>
        <mainMenu v-model='menulist' @choice="menu=$event" />
    </v-app-bar>

    <v-main>
        <listApp v-if="menu==='home'" @changeMenu="menu=$event" />
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
    menu: 'home',
    menulist: [
      { title: 'home' },
      { title: 'recette' },
      { title: 'dev Wiki' },
      { title: 'scoreBoard' },
      { title: 'plotly' },
    ],
  }),
  mounted() {
    if (localStorage.menu) this.menu = localStorage.menu;
  },
  watch: {
    menu(newValue) {
      localStorage.menu = newValue;
    },
  },
};
</script>
<style lang="css">
  .navBarText {
    position: fixed;
    left: 30px;
    color:white;
  }
  .navBarText:hover {
    /* border: white 1px solid;
    border-radius: 10px; */
    font-weight: bold;
    padding: 10px;
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
  0% {
    left: 30px;
  }
  50% {
    left: 40px;
    font-size: 1.3rem;
  }
  100% {
    left: 30px;
  }
}
</style>
