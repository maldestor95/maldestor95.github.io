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
    </v-main>
</v-app>
</template>

<script>
import mainMenu from './components/menu.vue';
import listApp from './components/listapp.vue';
import recetteApp from './features/recette/recettepage.vue';

export default {
  name: 'App',
  components: {
    mainMenu,
    listApp,
    recetteApp,
  },

  data: () => ({
    menu: 'home',
    menulist: [
      { title: 'home' },
      { title: 'recette' },
    ],
  }),
};
</script>
