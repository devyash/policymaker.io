<template>

  <div class="simplequeryemployment">


    <div class="container-fluid">
      <div class="jumbotron">
        <h1>Employment: Simple Query</h1>
      </div>
      <div class="row">
      <div class="panel panel-default">
      <div class="panel-heading">
      <h3 style="text-align:left">Query 1</h3>
      </div>  
      <h4>Gets the Top/Bottom 'N' For All States for a given year or all years based on selection criteria(Employed/Unemployed).</h4>
      <div>
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

    <div class="container-fluid">
      <h3 style="text-align:left">Query 2</h3>
      <h4>Retrieve the counties accross all states in the increasing/decreasing order of growth rate based on a user defined criteria. </h4>

      <p>Growth Rate Order: I/D (DD), From YEAR 2011-2015(DD) , TO YEAR, CRITERA: Employed/ Unemployment(DD) </p>
      <div>
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
        <p>---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
      </div>
    </div>



    <div class="container-fluid">

      <table class="table table-bordered table-responsive">
        <thead>
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
          <p style="white-space: pre">{{ someData }}</p>
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
        gridColumns: ['name','harika'],
        gridData: [
        { name: 'Rajesh', harika: 9000 },
        { name: 'Jackie Chan', harika: 7000 },
        { name: 'Jet Li', harika: 8000 },
        { name: 'TA', harika: 193912 }
        ],
        someData: ""

      };
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

    } 
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

