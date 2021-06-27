<template>
  <v-container >
    <v-icon @click="toggleSetup()">mdi-cogs</v-icon>
    <v-row fluid>
      <!-- Setup -->
      <v-col v-if="showSetup" >
        <v-card>
          <v-card-title color="primary">
            <h1>Setup</h1>
          </v-card-title>
          <v-card-actions>
            <v-container>
              <v-row>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="addplayer()">
                  <v-icon>mdi-plus-circle</v-icon>
                  Add player
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="newGame()" :disabled="playerList.length===0">
                  <v-icon>mdi-restart-off</v-icon>
                  new
                </v-btn>
                <v-spacer></v-spacer>
              </v-row>
            </v-container>
          </v-card-actions>
          <v-card-text fluid>
                <v-container fluid>
                  <v-row class="d-none d-sm-flex">
                    <v-col  cols="1" sm="2"
                    class="ml-n6 ml-sm-0 mr-8 mr-sm-n16"
                    >
                      action
                    </v-col>
                    <v-col sm="9">
                      Name
                    </v-col>
                    <v-col cols="1" >
                      Score
                    </v-col>
                  </v-row>
                  <v-row v-for="player in playerList" :key="player.uuid"
                  dense
                  >
                    <v-col cols="1" sm="2" class="mt-5 ml-n6 ml-sm-0 mr-11 mr-sm-n16">
                      <v-btn color="success" small >
                        <v-icon @click="removePlayer(player.uuid)">mdi-delete-circle</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="10" sm="9" >
                      <v-text-field
                        :label= "'Joueur ' + playerNumber(player.uuid)"
                        v-model="player.name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="1" sm="1" class="mt-5 d-none d-sm-inline text-center">
                      {{ player.total}}
                    </v-col>
                  </v-row>
                </v-container>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- Round -->
      <v-col v-if=" !showSetup " class="px-0 px-sm-4" cols="12" sm="4">
        <v-card  max-width="600px" class="px-2" >
          <h1>Score</h1>
          <h2>Round {{roundId}}</h2>
          <v-row >
              <v-col>name</v-col>
              <v-col class=" editRoundScore">Round </v-col>
              <v-col class=" editRoundScore">Score</v-col>
            </v-row>
          <div v-for="player in playerList" :key="player.uuid"
          :class="{ focusEditRound: playerRoundEditable(player.uuid)}"
          >
            <v-row @click="currentPlayer=player.uuid">
              <v-col>{{player.name}}</v-col>
              <v-col
              class=" editRoundScore"
              >
              {{cRound(player.uuid)}}
              </v-col>
              <v-col class=" editRoundScore">
                {{getScores(player.uuid) + cRound(player.uuid)}}
              </v-col>
            </v-row>
            <v-row v-show="playerRoundEditable(player.uuid)"
            class="pb-4">
              <v-spacer></v-spacer>
              <v-btn :small="displaySmallDevice" color="green lighten-4"
                @click="updateRound(player.uuid, 10)">
                +10
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn :small="displaySmallDevice" color="green lighten-4"
              @click="updateRound(player.uuid, 5)">
              +5</v-btn>
              <v-spacer></v-spacer>
              <v-btn :small="displaySmallDevice" color="green lighten-4"
              @click="updateRound(player.uuid, 1)">
              +1</v-btn>
              <v-spacer></v-spacer>

            </v-row>
            <v-row v-show="playerRoundEditable(player.uuid)"
            class="pb-4">
                <v-spacer></v-spacer>
                <v-btn :small="displaySmallDevice" color="red lighten-4"
                @click="updateRound(player.uuid, -1)">
                -1</v-btn>
                <v-spacer></v-spacer>
                <v-btn :small="displaySmallDevice" color="red lighten-4"
                @click="updateRound(player.uuid, -5)">
                -5</v-btn>
                <v-spacer></v-spacer>
                <v-btn :small="displaySmallDevice" color="red lighten-4"
                @click="updateRound(player.uuid, -10)">
                -10</v-btn>
                <v-spacer></v-spacer>
            </v-row>
          </div>
          <v-row class="mt-5 pb-4 justify-center">
            <v-btn @click="newRound">new round</v-btn>
          </v-row>
        </v-card>
      </v-col >
      <!-- Table with round score -->
      <v-col v-if=" !showSetup " class="px-0 px-sm-4" cols="12" sm="4">
      <v-card >
        <h1>Score history</h1>
        <v-switch label="Cumul" v-model="cumulativeDisplay"></v-switch>
          <v-simple-table class='roundTable' height='200px'>
            <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Round
                </th>
                <th v-for="pl in playerList" :key="pl.name"
                class="text-left">
                  {{pl.name}}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="rId in roundId"
                :key="rId"
              >
                <td> {{ roundId-rId }}</td>
                <td v-for="pl in playerList" :key="pl.name"
                  class="text-left">
                  {{playerRoundScore(pl.uuid, roundId-rId+1, cumulativeDisplay)}}
                </td>
              </tr>
            </tbody>
          </template>
      </v-simple-table>
        <!-- <div>editround</div>
        <div>deleteround</div> -->
      </v-card>
    </v-col>
    <!-- chart -->
    <v-col v-if=" !showSetup && roundId>0" class="px-0 px-sm-4" cols="12" sm="4">
      <v-card >
        <linechart chartid= "Score Chart"
          :data="plotData"
        ></linechart>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ScoreStore from './scorestore';
import linechart from '../../components/plotly/linechart.vue';

export default {
  components: {
    linechart,
  },
  data() {
    return {
      setup: true,
      nbplayer: 3,
      scores: [],
      roundId: 0,
      currentRound: [],
      cumulativeDisplay: true,
      currentPlayer: 0,
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
      this.roundId = 0;
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
    getScores(uuid) {
      return this.scores.getScore(uuid);
    },
    newRound() {
      const prepareData = [];

      for (let index = 0; index < this.currentRound.length; index += 1) {
        prepareData.push(
          {
            name: this.currentRound[index].name,
            roundData: this.currentRound[index].round,
          },
        );
        this.currentRound[index].round = 0;
      }

      this.scores.addRound(prepareData);
      this.roundId += 1;
      return null;
    },
    playerRoundScore(uuid, rId, cumul = false) {
      const playerScores = this.scores.store.filter((pS) => pS.uuid === uuid)[0];
      if (cumul) {
        return playerScores.score.reduce((a, x, i) => [...a, x + (a[i - 1] || 0)], [])[rId];
      }
      return playerScores.score[rId];
    },
    playerRoundEditable(uuid) {
      return uuid === this.currentPlayer;
    },
  },
  computed: {
    playerList() {
      return this.scores.store;
    },
    showSetup() {
      return this.setup;
    },
    plotData() {
      const result = [];
      for (let index = 0; index < this.scores.store.length; index += 1) {
        const player = this.scores.store[index];
        result.push({
          name: player.name,
          y: player.cumulRound,
          x: Array.from({ length: player.cumulRound.length }, (v, i) => i),
        });
      }
      return result;
    },
    displaySmallDevice() {
      return this.$vuetify.breakpoint.name === 'xs';
    },
  },
};
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
.roundTable {
  background-color: red;
  // max-height: 500px;
}
h1, h2 {
  text-align: center;
}
.editRoundScore {
  text-align: center;
}
.focusEditRound {
  background-color: #1976D2;
  border: 1px ridge black;
  border-radius: 10px;
  padding: 10px;
  color: white;

}
</style>
