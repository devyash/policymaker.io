// CommitChart.js
import { Bar } from 'vue-chartjs'

export default Bar.extend({
  props: ['labels','row'],
  data: function (){
    return {
      locallabels:this.labels,
      localrow:this.row
      }
    },
    mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.locallabels,
      datasets: [
      {
        label: 'GitHub Commits',
        backgroundColor: '#f87979',
        data: this.localrow
      }
      ]
    }, {responsive:true, maintainAspectRatio: false })
  }
})