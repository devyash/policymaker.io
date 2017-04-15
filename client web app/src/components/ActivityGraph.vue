<template>
  <div class="ActivityGraph">
    <div>
<bar-chart :labels=labels :row=row>Yo</bar-chart>
  </div>
  </div>
</template>

<script>
import BarChart from './BarChart'
export default {
  props:['labels','row'],
  data: function(){
    return {
      locallabels: this.labels,
      localrow: this.row 
    }
  },
  components:{
    'bar-chart':BarChart
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
