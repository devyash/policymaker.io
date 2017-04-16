<template>
  <div class="ActivityGraph">
    <div>
<bar-chart :labels=labels :row=row :name=name>Yo</bar-chart>
  </div>
  </div>
</template>

<script>
import BarChart from './BarChart'
export default {
  props:['labels','row','name'],
  data: function(){
  },
  components:{
    'bar-chart':BarChart
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
