<template>
    <div>
        TTTT
        <v-icon @click="openLink(link)">mdi-github</v-icon>

    </div>
</template>

<script>
export default {
  methods: {
    props: {
      link: {
        type: String,
        default: '',
      },
    },
    openLink(link) {
      window.open(link, '_blank');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
