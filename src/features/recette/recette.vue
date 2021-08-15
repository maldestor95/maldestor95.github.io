<template>
    <v-container fluid>
       <v-row class="d-flex">
           <v-col cols="12" md="4" class="ingredients">
            <v-row v-for="ing in value.ingredients" :key="ing.id">
                <v-col >{{ ing.ingredient }}</v-col>
                <v-col>{{ ing.qty }}</v-col>
            </v-row>
           </v-col>
           <v-col md="8" class="process">
                <div v-html="value.recipe"/>
           </v-col>
       </v-row>
    </v-container>
</template>
<script>

export default {
  props: {
    value: {
      type: Object,
      default: () => ({
        title: '',
        link: '',
        recipe: '',
        ingredients: {},
      }),
    },
  },
  data() {
    return {
      recipe: '',
      ingredients: '',
    };
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
