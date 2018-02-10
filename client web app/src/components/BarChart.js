// CommitChart.js
import { Bar } from 'vue-chartjs';

export default Bar.extend({
  props: ['labels', 'row', 'name'],
  data: () => ({
    localname: this.name,
    locallabels: this.labels,
    localrow: this.row,
  }),
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: this.name.toString(),
          backgroundColor: '#f87979',
          data: this.row,
        },
      ],
    }, {
      responsive: true,
      maintainAspectRatio: false,
    });
  },
  watch: {
    // whenever labels changes, this function will run
    labels: () => {
      this.renderChart({
        labels: this.labels,
        datasets: [
          {
            label: this.name.toString(),
            backgroundColor: '#f87979',
            data: this.row,
          },
        ],
      }, {
        responsive: false, maintainAspectRatio: false });
    },
  },
});
