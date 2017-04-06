<template>

  <div class="simplequeryemployment">

<div class="jumbotron">
  <h1>Employment - Simple Query</h1>
</div>
    <h2>Gets the Top/Bottom 'N' For All States for a given year or all years based on selection criteria(Employed/Unemployed).</h2>
    <div class="container-fluid">
    <div class="col-md-6 col-sm-6 col-xs-12">
    <form method="POST">
      <div class="form-group">
        <label for="selectrange">SELECT</label>
        <select v-model="selectrange" class="form-control" id="selectrange" required>
        <option disabled value="">Please Select a Query Type</option>
          <option>Top</option>
          <option>Bottom</option>
        </select>
        <br>
        <label for="N" > FOR</label>
        <input type="text" name="Value" v-model='N' required>

        <br>
        <br>
        <label for="year">YEAR:</label>
        <select v-model='year' class="form-control" id="year">
        <option disabled value="">Please Select a Value for year</option>
          <option>All Years</option>
          <option>Each Years</option>
        </select>
        <br>
        <label for="criteria"> CRITERIA:</label>
        <select v-model='criteria' class="form-control">
        <option disabled value="">Please Select a Selection Criterea</option>
          <option>Employed</option>
          <option>Unemployed</option>
        </select>
        <br>
        <div class="form-group">
        <button type="Submit" v-on:click.prevent=submitQuery() class="btn-primary">Submit</button>

        </div>
        </div>
        </form>
        </div>
      </div>

<div class="container">
       <table class="table table-bordered">
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
      gridColumns: ['name', 'harika','Devyash'],
      gridData: [
        { name: 'Bruce Lee', harika: 9000 },
        { name: 'Jackie Chan', harika: 7000 },
        { name: 'Jet Li', harika: 8000 }
      ]

    };
  },
  methods: {
    submitQuery: function () {
      // send a post request to Form POST URL
      //Whatever data you get update the coloumn name accordingly
      alert("Employment Table Queried")
    } 
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .simplequeryemployment{
    position: relative;
    left: 20%;
    border: 3px solid #00000;
  }
  
</style>

