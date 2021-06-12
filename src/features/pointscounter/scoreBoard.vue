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
      <p>Round {{roundId}}</p>
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
        <v-col>
          Provisoire {{getScores(player.uuid) + cRound(player.uuid)}}
        </v-col>
      </v-row>
      <v-btn @click="newRound">new round</v-btn>
    </v-card>

    <v-card v-if=" !showSetup ">
      <div>roundTable</div>
      <v-switch label="Cumul" v-model="cumulativeDisplay"></v-switch>
        <v-simple-table>
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
      <div>editround</div>
      <div>deleteround</div>
    </v-card>

    <v-card v-if=" !showSetup ">
      <linechart chartid= "Line Chart"
        :data="plotData"
      ></linechart>
    </v-card>
  </div>
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
  },
};
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>

</style>
