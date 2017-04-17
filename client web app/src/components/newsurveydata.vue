<template>
  <div
  <div class="newsurveydata" >
  

    <div class="container-fluid">
<!--     <pre>{{$data}}</pre> -->
  <div class="row">
   <div >
    <form method="post">
    <h1 class="page-header">New Survey Data</h1>
     <div class="panel panel-default">
     <div class="panel-heading"></div>
     <div class="panel-body">
     <div class="form-group ">
     <div class="btn-group" data-toggle="buttons" v-model="policyarea">
  <label class="btn btn-primary active">
    <input type="radio" name="options" id="option1" autocomplete="off" checked>State
  </label>
  <label class="btn btn-primary">
    <input type="radio" name="options" id="option2" autocomplete="off"> County
  </label>

</div>
<br><br>

     <div class="form-group col-sm-6">
      <label class="control-label requiredField" for="policystate">
       State:
      </label>
      <input class="form-control" id="policystate" name="policystate" type="text" v-model="policystate"/>
     </div>
      <div class="form-group col-sm-6">
      <label class="control-label requiredField" for="policycounty">
       County:
      </label>
      <input class="form-control" id="policycounty" name="policycounty" type="text" v-model="policycounty"/>
     </div>
     <label> Select a CSV File to upload</label>
     <input type="file" name="image">
     <button class="btn btn-primary " name="submit" type="submit" v-on:click.prevent=submitPolicy()>
        Submit
       </button>
      
       

     </div>
     </div>
     </div>
    </form>
</div>
</div>
</div>
</div>
</template>

<script>
export default {
  name: 'header',
  data() {
    return {
      policystate:'',
      policycounty:'',
      policyarea:'',
      policyid:0,
      policyname: '',
      policydiscription:'',
      policyduration: 0,
      policybudget: 0,
      policydomain: 0,
      selecteddomain:'',
      domainoptions:[
                    {
                      text:"Education",
                      value:"Education"
                    },
                    {
                      text:"Population",
                      value:"Population"
                    },
                    {
                      text:"Employment",
                      value:"Employment"
                    },
                    {
                      text:"Poverty",
                      value:"Poverty"
                    }
      ]

    };
  },
  methods: {
    submitPolicy: function () {
      // send a post request to Form POST URL
      alert("Policy Submited")
    } 
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
