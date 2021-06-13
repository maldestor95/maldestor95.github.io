<template>
    <div >
        <div :id="chartid" class='plotly'>
        </div>
   </div>
</template>

<script>
import Plotly from 'plotly.js-dist';

export default {
  props: {
    chartid: {
      type: String,
      default: 'line chart ',
    },
    data: {
      type: Array,
      default: () => [
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
    },
  },
  data() {
    return {
      layout: {
        title: this.chartid,
        showlegend: true,
        legend: { orientation: 'h' },
        xaxis: {
          autorange: true,
        },
        yaxis: {
          autorange: true,
        },
      },
      options: {
        scrollZoom: true,
        displayModeBar: false,
      },
    };
  },
  mounted() {
    this.plot(this.data);
  },
  watch: {
    data: {
      handler() {
        this.redraw();
      },
      deep: true,
    },
  },
  methods: {
    plot(data) {
      Plotly.newPlot(this.chartid, data, this.layout, this.options);
    },
    redraw() {
      Plotly.react(this.chartid, this.data, this.layout, this.options);
    },
  },
};
</script>

<style lang="scss" scoped>
.plotly {
    width: 100%;
}

</style>
