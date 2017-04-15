<template>
  <div class="ActivityGraph">
    <div>
<bar-chart :labels=locallabels :row=localrow :name=localname>Yo</bar-chart>
  </div>
  </div>
</template>

<script>
import BarChart from './BarChart'
export default {
  props:['labels','row','name'],
  data: function(){
    return {
      locallabels: this.labels,
      localrow: this.row,
      localname: this.name, 
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
