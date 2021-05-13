<template>
    <div>
      <div :id="chartid"></div>
   </div>
</template>

<script>
import Plotly from 'plotly.js-dist';

export default {
  props: {
    chartid: {
      type: String,
      default: 'tendancechart',
    },
    jalons: {
      type: Array,
      default: () => [

        {
          x: ['2020-09-04', '2020-11-04', '2020-12-04'],
          y: ['2020-11-20', '2020-11-30', '2020-12-01'],
          name: ' Jalon default',
        },
        {
          x: ['2020-09-04', '2020-11-04', '2020-12-04'],
          y: ['2021-10-20', '2021-10-30', '2021-12-02'],
          name: ' Jalon default2',
        },
      ],
    },
    start: { type: String, default: '2020-01-04' },
    stop: { type: String, default: '2023-01-02' },
  },
  watch: {
    data: {
      handler() {
        this.redraw();
      },
      deep: true,
    },
  },
  mounted() {
    this.plot();
  },
  methods: {
    plot() {
      const data = [...this.jalons];

      const layout = {
        title: this.chartid,
        showlegend: true,
        legend: { orientation: 'h' },
        xaxis: {
          autorange: false,
          range: [this.start, this.stop],
          type: 'date',
        },
        yaxis: {
          autorange: false,
          range: [this.start, this.stop],
          type: 'date',
        },
        shapes: [
        // triangle
          {
            type: 'path',
            path: `M ${this.start} ${this.start} L ${this.stop} ${this.stop} L  ${this.stop} ${this.start} Z`,
            fillcolor: 'rgba(44, 160, 101, 1)',
            line: {
              color: 'rgb(44, 160, 101)',
            },
          },
        ],
      };

      const options = {
        scrollZoom: false,
        displayModeBar: false,
      };

      Plotly.newPlot(this.chartid, data, layout, options);
    },
    redraw() {
      Plotly.redraw(this.chartid);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
