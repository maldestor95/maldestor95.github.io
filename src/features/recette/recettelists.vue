<template>
    <div>
      <v-text-field box label="Recette" v-model="searchRecipe"
      name="searchRecipe"
      clearable
      autocomplete="off"
      >
      </v-text-field>
      <ul class="recetteList">
        <li v-for="recette in recetteslistfiltered" :key="recette.id">
            <a @click="selectRecipe(recette)">{{ recette.title }}</a>
        </li>
      </ul>
    </div>
</template>

<script>
import yaml from 'js-yaml';
import constants from './constants';

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    maxResponseNumber: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      recetteslist: 'string',
      chosenRecipe: this.value,
      recipeName: null,
      searchRecipe: '',
    };
  },
  mounted() {
    const url = `${constants.RecipePath}/recettelist.md`;
    const myHeaders = new Headers();
    const myInit = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
    };
    const lThis = this;
    fetch(url, myInit)
      .then((response) => response.text())
      .then((result) => {
        lThis.recetteslist = yaml.load(result);
      });
  },
  methods: {
    selectRecipe(recette) {
      this.$emit('choice', recette);
      this.recipeName = recette.title;
    },
  },
  computed: {
    recetteslistfiltered() {
      const maxListLength = this.maxResponseNumber;
      // eslint-disable-next-line no-console
      console.log(this.searchRecipe);
      if (this.searchRecipe === '' || this.searchRecipe === null) return this.recetteslist.slice(0, maxListLength);

      let convertRecipNameToFilter = this.searchRecipe[0].toUpperCase();
      for (let index = 1; index < this.searchRecipe.length; index += 1) {
        convertRecipNameToFilter += `(.*)${this.searchRecipe[index].toUpperCase()}`;
      }
      const regexFilter = new RegExp(convertRecipNameToFilter);

      const FullFilteredList = this.recetteslist.filter(
        (item) => regexFilter.test(item.title.toUpperCase()),
      );
      return FullFilteredList.slice(0, maxListLength);
    },
  },
};
</script>

<style lang="scss" scoped>
.recetteList {
  height: 200px;
  overflow-y: auto;
}
</style>
