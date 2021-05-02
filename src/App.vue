<template>
  <v-app>
    <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
            Maldestor95
        </div>
    </v-app-bar>

    <v-main>
        <listApp />
        <recette />
        <recettelist/>
    </v-main>
</v-app>
</template>

<script>
import listApp from './components/listapp.vue';
import recette from './features/recette/recette.vue';
import recettelist from './features/recette/recettelists.vue';

export default {
  name: 'App',
  components: {
    listApp,
    recette,
    recettelist,
  },

  data: () => ({
    //
  }),
};
</script>
