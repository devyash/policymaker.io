<template>
<div class="Map2">
<div id="map" style="width: 350px; height: 250px;"></div>
<div id="clicked-state"></div>
</div>	
</template>
<script >
export default {
  data: function(){
  	return{

  	}
  },
  created: function(){
  	$('#map').usmap({
  // The click action
  click: function(event, data) {
    $('#clicked-state')
      .text('You clicked: '+data.name)
      .parent().effect('highlight', {color: '#C7F464'}, 2000);
  }
});
  }

};

		
</script>
<style >
		
</style>
