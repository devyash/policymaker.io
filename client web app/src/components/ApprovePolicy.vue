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
  	<tr v-for="p in policies">
  	<td>{{p.POLICY_ID}}</td>
  	<td>{{p.POLICY_NAME}}</td>
  	<td>{{p.POLICY_APPROVED}}</td>
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
      policies:[{
        POLICY_ID: 1,
        POLICY_NAME: "test",
        POLICY_APPROVED: "Approved"
      }]
  	}
  },
  created: function () {
   policies: {
      let url="http://localhost:5000/policyapprove";

      this.$http.get(url).then((response) => {
          // get body data
          console.log("OUTPUT:");
          console.log(response.data);
          this.policies=response.data;

        }).then(()=>{
          this.displayResult=true;
        }).catch((e)=>{
          console.log(e);})
    }
  }


};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
