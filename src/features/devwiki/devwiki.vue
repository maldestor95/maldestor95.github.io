<template>
    <div>
        <v-icon @click="getUrl('SUMMARY.md')">mdi-home-assistant </v-icon>

        <v-icon @click="openLink('https://github.com/maldestor95/dev-wiki')">mdi-github</v-icon>

        <div v-html="pageWiki" id='pageWiki'>
        </div>
    </div>
</template>

<script>
import marked from 'marked';
import constants from './constants';

export default {
  data() {
    return {
      pageWiki: 'welcome',
    };
  },
  mounted() {
    this.getUrl('SUMMARY.md');
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
      fetch(`${constants.devWikiPath}/${urlToFetch}`, myInit)
        .then((response) => response.text())
        .then((result) => {
          const ElementsByTagName = new Promise((resolve) => {
            localThis.pageWiki = marked(result);
            resolve(document.getElementById('pageWiki').getElementsByTagName('a'));
          });

          ElementsByTagName.then((links) => {
            links.forEach((lien) => {
              const newLien = lien;
              newLien.templink = lien.href;
              const baseUrlRegex = new RegExp(window.location.origin);
              if (baseUrlRegex.test(newLien.href)) {
                newLien.addEventListener('click', () => {
                  const destUrl = newLien.templink.replace(`${window.location.origin}/`, '');
                  localThis.getUrl(destUrl);
                });
                newLien.removeAttribute('href');
              }
            });
          });
        });
    },
    openLink(link) {
      window.open(link, '_blank');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
