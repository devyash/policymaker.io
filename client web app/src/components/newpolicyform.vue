<template>
  <div
  <div class="newpolicyform" >
  

    <div class="container-fluid">
  <div class="row">
   <div >
    <form method="post">
    <h1 class="page-header">New Policy Submission Form</h1>
     <div class="panel panel-default">
     <div class="panel-heading">Policy ID: {{policyid}}</div>
     <div class="panel-body">
     <div class="form-group ">
      <label class="control-label requiredField" for="domain">
       Domain
       <span class="asteriskField">
        *
       </span>
      </label>
      <select class="select form-control" id="domain" name="domain" v-model="selecteddomain">
       <option v-for="option in domainoptions" v-bind:value="option.value">
        {{option.value}}
       </option>
      </select>
     </div>
     <div class="form-group ">
      <label class="control-label requiredField" for="policyduration">
       Policy Duration (Approx Duration in Months)
       <span class="asteriskField">
        *
       </span>
      </label>
      <input class="form-control" id="policyduration" name="policyduration" type="text" v-model="policyduration"/>
     </div>
     <div class="form-group ">
      <label class="control-label requiredField" for="policybudget">
       Policy Budget(in $)
       <span class="asteriskField">
        *
       </span>
      </label>
      <input class="form-control" id="policybudget" name="policybudget" type="text"v-model="policybudget"/>
     </div>
     <div class="form-group ">
      <label class="control-label requiredField" for="policyname">
       Policy Name:
       <span class="asteriskField">
        *
       </span>
      </label>
      <input class="form-control" id="policyname" name="policyname" type="text" v-model="policyname"/>
     </div>
     <div class="form-group ">
      <label class="control-label requiredField" for="policydiscription">
       Policy Discription
       <span class="asteriskField">
        *
       </span>
      </label>
      <textarea class="form-control" cols="40" id="policydiscription" name="policydiscription" rows="10"v-model="policydiscription"></textarea>
     </div>
     <div class="form-group">
      <div>
       <button class="btn btn-primary " name="submit" type="submit" v-on:click.prevent=submitPolicy()>
        Submit
       </button>
      </div>
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
