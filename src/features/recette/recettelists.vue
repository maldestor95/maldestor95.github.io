<template>
    <div>
        <div v-for="recette in recetteslistfiltered" :key="recette.id">
            <a @click="selectRecipe(recette)">{{ recette.title }}</a>
        </div>
    </div>
</template>

<script>
import yaml from 'js-yaml';

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    maxResponseNumber: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      recetteslist: 'string',
      chosenRecipe: this.value,
      recipeName: null,
    };
  },
  mounted() {
    const url = 'recettes/recettelist.md';
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
      console.log(this.value);
      if (this.value === '' || this.value === null) return this.recetteslist.slice(0, maxListLength);

      let convertRecipNameToFilter = this.value[0].toUpperCase();
      for (let index = 1; index < this.value.length; index += 1) {
        convertRecipNameToFilter += `(.*)${this.value[index].toUpperCase()}`;
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
</style>
