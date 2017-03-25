<template>
  <div class="EducationGraph">
    <h1>{{ msg }}</h1>
    <p>Loading graph here. Refresh if problem persists</p>
  </div>
</template>

<script>
export default {
  name: 'header',
  data() {
    return {
      msg: '',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
