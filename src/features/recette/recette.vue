<template>
    <v-container fluid>
       <v-row class="d-flex">
           <v-col cols="12" md="4" class="ingredients">
            <v-row v-for="ing in ingredients" :key="ing.id">
                <v-col >{{ ing.ingredient }}</v-col>
                <v-col>{{ ing.qty }}</v-col>
            </v-row>
           </v-col>
           <v-col md="8" class="process">
                <div v-html="recipe"/>
           </v-col>
       </v-row>
       {{recipeLink}}
       <v-btn color="success" @click="getUrl('index.html')">text</v-btn>
    </v-container>
</template>
<script>
import marked from 'marked';
import yaml from 'js-yaml';

export default {
  props: {
    value: {
      type: Object,
      default: () => ({
        title: '',
        link: '',
      }),
    },
  },
  data() {
    return {
      recipeLink: this.value,
      recipe: '',
      ingredients: '',
    };
  },
  mounted() {
    this.getUrl(this.value.link);
  },
  watch: {
    immediate: true,
    value(newValue) {
      // eslint-disable-next-line no-console
      console.log(newValue);
      this.recipeLink = newValue;
      this.getUrl(this.recipeLink.link);
    },
  },
  methods: {
    getUrl(urlToFetch) {
      const myHeaders = new Headers();
      const myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
      };
      const localThis = this;
      fetch(`${urlToFetch}`, myInit)
        .then((response) => response.text())
        .then((result) => {
          const endYamlPosition = result.indexOf('...');
          localThis.ingredients = yaml.load(result.substring(0, endYamlPosition + 3));
          localThis.recipe = marked(result.substring(endYamlPosition + 3));
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.ingredients {
    border: black dashed 0.5px;
    border-radius: 10px;
}
.process {
    border: black dashed 0.5px;
    border-radius: 10px;
}
</style>
