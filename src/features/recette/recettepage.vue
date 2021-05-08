<template>
    <div>
        <recettelist @choice='changeRecipe($event)'/>
        <recette v-model='recipeModel'/>
    </div>
</template>

<script>
import marked from 'marked';
import yaml from 'js-yaml';
import constants from './constants';
import recette from './recette.vue';
import recettelist from './recettelists.vue';

export default {
  components: {
    recette,
    recettelist,
  },
  data() {
    return {
      recipeModel: {
        title: 'une recette banale',
        link: 'readme.md',
        recipe: '',
        ingredients: '',
      },
    };
  },
  methods: {
    changeRecipe(event) {
      this.recipeModel.link = event.link;
      this.recipeModel.title = event.title;
      this.getUrl(`${constants.RecipePath}/${this.recipeModel.link}`);
    },
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
          // eslint-disable-next-line no-console
          console.log(result);
          const endYamlPosition = result.indexOf('...');
          localThis.recipeModel.ingredients = yaml.load(result.substring(0, endYamlPosition + 3));
          localThis.recipeModel.recipe = marked(result.substring(endYamlPosition + 3));
        });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
