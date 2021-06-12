<template>
    <div>
      <h1>Démonstration Plotly</h1>

<v-container grid-list-xs>
  <v-row>
      <tendancechart chartid="Diagramme de Tendance"
        :jalons="jalons"
        :start="startchart"
        :stop="stopchart">
      </tendancechart>
  </v-row>
  <v-row>

        <linechart chartid= "Line Chart"
        :data="linechartData"
        ></linechart>
        <v-btn color="info" @click="addScore()">Add Score</v-btn>
  </v-row>
</v-container>
    </div>
</template>

<script>
import linechart from '../../components/plotly/linechart.vue';
import tendancechart from '../../components/plotly/tendancechart.vue';

export default {
  components: {
    linechart, tendancechart,
  },
  data() {
    return {
      jalons: [
        {
          x: ['2021-02-04', '2021-04-04', '2021-06-04'],
          y: ['2021-06-20', '2021-06-30', '2021-06-30'],
          name: ' Jalon 0',
        },
        {
          x: ['2021-02-04', '2021-04-04', '2021-06-04'],
          y: ['2021-10-20', '2021-11-30', '2021-11-30'],
          name: ' Jalon 10',
        },
        {
          x: ['2021-02-04', '2021-04-04', '2021-06-04'],
          y: ['2021-05-20', '2021-05-30', '2021-05-30'],
          name: ' Jalon 20',
        },
      ],
      startchart: '2021-01-01',
      stopchart: '2021-12-31',
      linechartData: [
        {
          x: [1, 2, 3, 4],
          y: [5, 10, 15, 20],
          name: 'Player 1',
        },
        {
          x: [1, 2, 3, 4],
          y: [0, 0, 10, 20],
          name: 'Player 2',
        },
      ],
    };
  },
  methods: {
    addScore() {
      const currentRound = this.linechartData[0].x.length;
      const player = 0;
      // for (let player = 0; player < this.linechartData.length; player += 1) {
      this.linechartData[player].x = [...this.linechartData[player].x, currentRound + 1];
      this.linechartData[player].y = [...this.linechartData[player].y, 30];
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.tendancechart {
  background-color: red;
  max-width: 400px;
}
</style>
