// CommitChart.js
import { Bar } from 'vue-chartjs'

export default Bar.extend({
  props: ['labels','row','name'],
  data: function (){
    return {
      localname: this.name,
      locallabels: this.labels,
      localrow: this.row
      }
    },
    mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.locallabels,
      datasets: [
      {
        label: this.localname.toString(),
        backgroundColor: '#f87979',
        data: this.localrow
      }
      ]
    }, {responsive:true, maintainAspectRatio: false })
  }
})