<template>

  <div class="simplequeryemployment">


    <div class="container-fluid">
      <h1 class="page-header">Employment: Simple Query</h1>
      <div class="row">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 style="text-align:left">Query 1</h4>
          </div>  
          <h4>Query to retrieve the required leading/trailing states/counties based on employment/unemployment criteria filtering.</h4>
          <div class= "panel-body">
            <form method="POST" class="form-inline" >
              <div class="form-group">
                <label class="col-2 col-form-label" for="selectrange">Order</label>
                <select v-model="selectrange" class="form-control" id="selectrange" required>
                  <option disabled value="">Please Select a Query Type</option>
                  <option>decreasing</option>
                  <option>increasing</option>
                </select>
                <label class="col-2 col-form-label" for="N" > N:</label>

                <input type="text" name="Value" v-model='N' required>
                <label class="col-1 col-form-label" for="criteria"> CRITERIA:</label>
                <select v-model='criteria' class="form-control">
                  <option disabled value="">Please Select a Selection Criterea</option>
                  <option>employed</option>
                  <option>unemployed</option>
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
              <donut-chart 
              id="donut" 
              :data="donutData" 
              colors='[ "#FF6384", "#36A2EB", "#FFCE56" ]' 
              resize="true">
            </donut-chart>
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




  <pre>{{ $data }}</pre>
</div>
</div>










</template>

<script>

  import { DonutChart } from 'vue-morris'

  export default {
    name: 'header',
    data() {
      return {
        type: 'simple',
        selectrange: '',
        N:1,
        criteria: '',
        labels: ['LOLOL', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        row: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
          // name: "Results",
          gridColumns: ['STATE','COUNTY','ATTRIBUTE1'],
          gridData: [],
          someData: "",
          displayResult: false,
          donutData: [
          { label: 'Employeed', value: 300 },
          { label: 'Unemployed', value: 10 }
          ],
        };
      },
      components: {
        DonutChart
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
      let url="http://localhost:5000/employment";
      let params={
        type: this.type,
        selectrange: this.selectrange,
        criteria: this.criteria,
        N: this.N
      };
      console.log(params);
      this.$http.get(url,{params: params}).then((response) => {
          // get body data
          this.gridData=response.data;
          console.log("OUTPUT:");
          console.log(response.data);
        })
          this.displayResult=true;

      //Whatever data you get update the coloumn name accordingly



    } 
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

