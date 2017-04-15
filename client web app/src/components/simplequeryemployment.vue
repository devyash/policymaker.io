<template>

  <div class="simplequeryemployment">


    <div class="container-fluid">
      <h1 class="page-header">Employment: Simple Query</h1>
      <div class="row">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 style="text-align:left">Query 1</h4>
          </div>  
          <h4>Gets the Top/Bottom 'N' For All States for a given year or all years based on selection criteria(Employed/Unemployed).</h4>
          <div class= "panel-body">
            <form method="POST" class="form-inline" >
              <div class="form-group">
                <label class="col-2 col-form-label" for="selectrange">SELECT</label>
                <select v-model="selectrange" class="form-control" id="selectrange" required>
                  <option disabled value="">Please Select a Query Type</option>
                  <option>Top</option>
                  <option>Bottom</option>
                </select>
                <label class="col-2 col-form-label" for="N" > FOR</label>

                <input type="text" name="Value" v-model='N' required>

                <label class="col-2 col-form-label" for="year">YEAR:</label>
                <select v-model='year' class="form-control" id="year">
                  <option disabled value="">Please Select a Value for year</option>
                  <option>All Years</option>
                  <option>Each Years</option>
                </select>
                <br>
                <label class="col-1 col-form-label" for="criteria"> CRITERIA:</label>
                <select v-model='criteria' class="form-control">
                  <option disabled value="">Please Select a Selection Criterea</option>
                  <option>Employed</option>
                  <option>Unemployed</option>
                </select>
                <div class="form-group col-2 col-form-label ">

                  <button type="Submit" v-on:click.prevent=submitQuery() class=" btn btn-primary col-sm-12">Submit</button>

                </div>
              </div>
            </form>
            <br>
          </div>
        </div>
      </div>
    </div>

<!-- TODO
      <h4>Retrieve the counties accross all states in the increasing/decreasing order of growth rate based on a user defined criteria. </h4>

      <p>Growth Rate Order: I/D (DD), From YEAR 2011-2015(DD) , TO YEAR, CRITERA: Employed/ Unemployment(DD) </p> -->

      <!-- --------------------------------------------------------------------- -->

      <div class="container-fluid" v-if="displayResult==true">

        <!-- TABLE-->

        <div class="row">
          <div class="panel panel-default">
            <div class= "panel-heading"> <h4 style="text-align:left">Results: Table</h4></div>
            <div class="panel-body">
              <table class="table table-bordered table-responsive">
                <thead style="text-align:center">
                  <tr>
                    <th v-for="entery in gridColumns">{{entery}}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="entry in gridData">
                    <td v-for="key in gridColumns">
                      {{entry[key]}}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ------------------------------------------------------------------ -->

        <div class="row">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4 style="text-align:left"> Graphs</h4>
            </div>
            <div class="panel-body">
            <p>This is a graph body</p>
              <activity-graph :labels=labels :row=row :name=name></activity-graph>
            </div>
          </div>
        </div>

        <!-- ---------------------------------------------------------------->
      <!-- QUERY -->
        <div class="row">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4 style="text-align:left"> QUERY</h4>
            </div>
            <div class="panel-body">
              <pre>This is the QUERY</pre>
            </div>
          </div>
        </div>

        <!-- ---------------------------------------------------------------->

<!-- 


        <pre>{{ $data }}</pre> -->
      </div>
    </div>










  </template>

  <script>
    export default {
      name: 'header',
      data() {
        return {
          type: '',
          selectrange: '',
          N:'',
          year: '',
          criteria: '',
          labels: ['LOLOL', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          row: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
          // name: "Results",
          gridColumns: ['attribute','value'],
          gridData: [
          { attribute: 'Rajesh', value: 9000 },
          { attribute: 'Jackie Chan', value: 7000 },
          { attribute: 'Jet Li', value: 8000 },
          { attribute: 'TA', value: 193912 }
          ],
          someData: "",
          displayResult: false

        };
      },
      computed:{
        name: function(){
          if(!this.selectrange || !this.N)
            return "Result"
          else
            return this.selectrange +" "+this.N;
        }
      },
      methods: {
        submitQuery: function () {
      // send a GET REQUEST
      // GET /someUrl
      fetch('https://httpbin.org/user-agent').then(response => {
        alert("data sent and got a response!");
          // get body data
          this.someData = response;
          alert("Value set!");
        });
      //Whatever data you get update the coloumn name accordingly

      this.displayResult=true;

    } 
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

