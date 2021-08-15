<template>
    <div>
        <v-menu offset-y open-on-hover
        transition="slide-x-transition"
        >
            <template v-slot:activator="{ on, attrs }">
                 <v-icon
                    v-bind="attrs"
                    v-on="on"
                 >mdi-dots-vertical</v-icon>
            </template>

            <v-list>
                <v-list-item
                v-for="(item, index) in value"
                :key="index"
                >
                <v-list-item-title
                    @click="choiceMade(item.title)"
                >
                    {{ item.title }}
                </v-list-item-title>
                </v-list-item>
            </v-list>

        </v-menu>
    </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    },
  },
  data: () => ({
    // menulist: this.value,
    showMenu: false,
    items: [
      { title: 'CMe' },
      { title: 'CMe' },
      { title: 'CMe' },
      { title: 'CMe 2' },
    ],
  }),
  methods: {
    choiceMade(choice) {
      this.$emit('choice', choice);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-list-item:hover {
    background-color: rgb(25,118,208);
}
.v-list-item:hover > *{
    color: white;
}
</style>
