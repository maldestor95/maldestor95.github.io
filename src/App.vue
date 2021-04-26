<template>
  <v-app>
    <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
            Maldestor95
        </div>
    </v-app-bar>

    <v-main>
        <listApp />
    </v-main>
</v-app>
</template>

<script>
import listApp from './components/listapp.vue';

export default {
  name: 'App',
  components: {
    listApp,
  },

  data: () => ({
    //
  }),
};
</script>
