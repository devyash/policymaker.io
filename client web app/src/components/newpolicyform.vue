<template>
  <div
  <div class="newpolicyform" >
  

    <div class="container-fluid">
<!--     <pre>{{$data}}</pre> -->
  <div class="row">
   <div >
    <form method="post">
    <h1 class="page-header">New Policy Submission Form</h1>
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
      <textarea class="form-control" cols="40" id="policydescription" name="policydescription" rows="10"v-model="policydescription"></textarea>
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
 <pre>{{$data}}</pre>
  </div>


</template>


<script>
export default {
  name: 'header',
  data() {
    return {
      policystate:'',
      policycounty:'',
      policyname: '',
      policydescription:'',
      policyduration: 0,
      policybudget: 0,
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
      let url="http://localhost:5000/policy";
      let params={
        type: "submit",
        policystate: this.policystate,
        policycounty: this.policycounty,
        policyname: this.policyname,
        policydescription: this.policydescription,
        policyduration: this.policyduration,
        policybudget: this.policybudget,
        selecteddomain: this.selecteddomain

      };
      console.log(params);
      this.$http.post(url,{body: params}).then((response) => {
          // get body data
          alert("Policy Submitted Successfully!");
          console.log("OUTPUT:");
          console.log(response.data);

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
