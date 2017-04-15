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
  data: function(){
    return {
      labels: ['LOLOL', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
       row: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
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
