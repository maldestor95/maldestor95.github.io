<template>
  <div>
      <v-icon @click="toggleSetup()">mdi-cogs</v-icon>
      <v-card v-if="showSetup">
        <h1>Setup</h1>
        <v-container>
          <v-btn color="success" @click="addplayer()">
            <v-icon>mdi-plus-circle</v-icon>
            Add player
          </v-btn>
          <v-btn color="success" @click="newGame()" v-if="playerList.length>0">
            <v-icon>mdi-restart-off</v-icon>
            new game
          </v-btn>
          <v-row v-for="player in playerList" :key="player.uuid">
            <v-col>
              <v-text-field
                :label= "'Joueur ' + playerNumber(player.uuid)"
                v-model="player.name"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-btn color="success" @click="removePlayer(player.uuid)">remove player</v-btn>
            </v-col>
            <v-col>
              {{ player.total}}
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    <v-card v-if=" !showSetup ">
      <h1>Score</h1>
      <v-row v-for="player in playerList" :key="player.uuid">
        <v-col>{{player.name}}</v-col>
        <v-col>{{cRound(player.uuid)}}</v-col>
        <v-col>
            <v-btn color="success" @click="updateRound(player.uuid, 10)">+10</v-btn>
            <v-btn color="success" @click="updateRound(player.uuid, 5)">+5</v-btn>
            <v-btn color="success" @click="updateRound(player.uuid, 1)">+1</v-btn>
            <v-btn color="success" @click="updateRound(player.uuid, -1)">-1</v-btn>
            <v-btn color="success" @click="updateRound(player.uuid, -5)">-5</v-btn>
            <v-btn color="success" @click="updateRound(player.uuid, -10)">-10</v-btn>
        </v-col>
      </v-row>
      <div>view current score</div>
      <div>add round</div>
    <section>
      <h1>Graph</h1>
      <div>roundTable</div>
      <div>editround</div>
      <div>deleteround</div>
    </section>
    </v-card>
  </div>
</template>

<script>
import ScoreStore from './scorestore';

export default {
  components: {
  },
  data() {
    return {
      setup: true,
      nbplayer: 3,
      scores: [],
      roundId: 0,
      currentRound: [],
    };
  },
  created() {
    this.scores = new ScoreStore([]);
  },
  mounted() {
  },
  methods: {
    addplayer(name) {
      this.scores.addPlayer(name);
    },
    removePlayer(uuid) {
      const { name } = this.playerList.filter((p) => (p.uuid === uuid))[0];
      this.scores.deletePlayer(name);
    },
    newGame() {
      this.scores.newGame('Joueur');
      const round = this.scores.playerList.map((player) => ({ ...player, round: 0 }));
      this.currentRound = [...round];
      this.setup = false;
    },
    updateRound(uuid, value) {
      const uuidRound = this.currentRound.filter((round) => (round.id === uuid))[0];
      uuidRound.round += value;
    },
    cRound(uuid) {
      return this.currentRound.filter((round) => (round.id === uuid))[0].round;
    },
    toggleSetup() {
      if (this.playerList.length === 0) {
        this.setup = true;
        return this.setup;
      }
      if (this.currentRound.length === 0) {
        this.setup = true;
        return this.setup;
      }
      this.setup = !this.setup;
      return this.setup;
    },
    playerNumber(uuid) {
      const pList = this.scores.store.map((p) => p.uuid);
      return pList.indexOf(uuid).toString();
    },
  },
  computed: {
    playerList() {
      return this.scores.store;
    },
    showSetup() {
      return this.setup;
    },
  },
};
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>

</style>
