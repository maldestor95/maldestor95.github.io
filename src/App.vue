<template>
  <v-app>
    <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
            Maldestor95
        </div>
    </v-app-bar>

    <v-main>
        <listApp />
        <v-text-field v-model='testpath.link'></v-text-field>
        <recetteApp/>
    </v-main>
</v-app>
</template>

<script>
import listApp from './components/listapp.vue';
import recetteApp from './features/recette/recettepage.vue';

export default {
  name: 'App',
  components: {
    listApp,
    recetteApp,
  },

  data: () => ({
    testpath: { link: 'readme.md' },
  }),
};
</script>
