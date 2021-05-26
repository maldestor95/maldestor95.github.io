<template>
  <div>
    <section>
      <v-card>
        <h1>Setup</h1>
        <v-container>
          <v-btn color="success" @click="addplayer()">
            <v-icon>mdi-plus-circle</v-icon>
            Add player
          </v-btn>
          <v-btn>
            <v-icon>mdi-restart-off</v-icon>
            new game
          </v-btn>
          <v-row v-for="player in playerList" :key="player.id">
            <v-col>
              <v-text-field
                label="nom"
                v-model="player.nom"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-btn color="success" @click="removePlayer(player.id)">remove player</v-btn>
            </v-col>
            <v-col>

            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </section>
    <section>
      <h1>Score</h1>
      <div>view current score</div>
      <div>add round</div>
    </section>
    <section>
      <h1>Graph</h1>
      <div>roundTable</div>
      <div>editround</div>
      <div>deleteround</div>
    </section>
  </div>
</template>

<script>
import ScoreStore from './scorestore';

export default {
  components: {
  },
  data() {
    return {
      nbplayer: 3,
      scores: [],
    };
  },
  created() {
    this.scores = new ScoreStore(['joueur 1', 'joueur 2']);
  },
  mounted() {
  },
  methods: {
    addplayer() {
      this.scores.addPlayer('nouveau joueur');
    },
    removePlayer(id) {
      const { name } = this.playerList.filter((p) => (p.id === id))[0];
      this.scores.deletePlayer(name);
    },
  },
  computed: {
    playerList() {
      const pList = [];
      for (let index = 0; index < this.scores.playerList.length; index += 1) {
        pList.push(
          {
            nom: this.scores.playerList[index],
            id: index,
          },
        );
      }
      return pList;
    },
  },
};
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>

</style>
