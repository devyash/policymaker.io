<template>
  <div class="ApprovePolicy">
    <h4>Policies</h4>
  <table class="table table-striped table-bordered table-hover">

  	<thead>
  		<tr>
  		<th>Policy ID:</th>
  		<th>Policy Title</th>
  		<th>Status:</th>
  		<th>Action:</th>
  		</tr>
  	</thead>
  	<tbody>
  	<tr>
  	<td>12</td>
  	<td>Harika is Stupid</td>
  	<td>Not Approved</td>
  	<td><button class="btn-success">Approve</button>
  <button class="btn-danger">Dis-Approve</button></td>
  	</tr>
  	</tbody>
  </table>
  </div>
</template>

<script>

export default {
  data: function(){
  	return{

  	}
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
