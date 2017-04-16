<template>

  <div class="simplequeryemployment">


    <div class="container-fluid">
      <h1 class="page-header">Employment: Simple Query</h1>
      <div class="row">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 style="text-align:left">Query to retrieve the required leading/trailing states/counties based on employment/unemployment criteria filtering.</h4>
          </div>  
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
                <label class="col-1 col-form-label" for="criteria"> Criteria:</label>
                <select v-model='criteria' class="form-control">
                  <option disabled value="">Please Select a Selection Criterea</option>
                  <option>employed</option>
                  <option>unemployed</option>
                </select>
                <div class="form-group col-2 col-form-label ">

                  <button type="Submit" v-on:click.prevent=submitSimple() class=" btn btn-primary col-sm-12">Retrieve</button>

                </div>
              </div>
            </form>
            <br>
          </div>
        </div>
      </div>
    </div>
<!-- ---------------------------------------------------------------------- -->
<!--Complex Query-->

<div class="container-fluid">
      <div class="row">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 style="text-align:left">Query to retrieve the state/county along with the corresponding growth/decline rate trends in employment/unemployment from given year to other:</h4>
          </div>  
          <div class= "panel-body">
            <form method="POST" class="form-inline" >
              <div class="form-group">
                <label class="col-2 col-form-label" for="criteria">Criteria:</label>
                <select v-model="criteriac" class="form-control" id="selectrange" required>
                  <option disabled value="">Please Select a Criteria Type</option>
                  <option>employed</option>
                  <option>unemployed</option>
                </select>


                <label class="col-2 col-form-label" for="ratec">Rate:</label>
                <select v-model="ratec" class="form-control" id="selectrange" required>
                  <option disabled value="">Please Select a Rate Type</option>
                  <option>growth</option>
                  <option>decline</option>
                </select>


                <label class="col-2 col-form-label" for="fromc">From:</label>
                <select v-model="fromc" class="form-control" id="selectrange" required>
                  <option disabled value="">Please Select a Starting Year</option>
                  <option v-for="n in 11">{{n+2006}}</option>
                </select>


                <label class="col-2 col-form-label" for="toc">to:</label>
                <select v-model="toc" class="form-control" id="selectrange" required>
                  <option disabled value="">Please Select a Ending Year</option>
                  <option v-for="n in 11">{{n+2006}}</option>
                </select>

                <label class="col-2 col-form-label" for="Nc" > N:</label>

                <input type="text" name="Value" v-model='Nc' required>


                <label class="col-2 col-form-label" for="selectrangec">Order:</label>
                <select v-model="selectrangec" class="form-control" id="selectrange" required>
                  <option disabled value="">Please Select a Query Type</option>
                  <option>decreasing</option>
                  <option>increasing</option>
                </select>


                <div class="form-group col-2 col-form-label ">

                  <button type="Submit" v-on:click.prevent=submitComplex() class=" btn btn-primary col-sm-12">Retrieve</button>

                </div>
              </div>
            </form>
            <br>
          </div>
        </div>
      </div>
    </div>



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
            <pre></pre>
          </div>
        </div>
      </div>

      <!-- ---------------------------------------------------------------->





</div>
  <pre>{{ $data }}</pre>  
</div>










</template>

<script>

  import { DonutChart } from 'vue-morris'

  export default {
    name: 'header',
    data() {
      return {
        type: '',
        selectrange: '',
        N:0,
        criteria: '',
          gridData: [],
          someData: "",
          displayResult: false,
          donutData: [
          { label: 'Employeed', value: 300 },
          { label: 'Unemployed', value: 10 }
          ],
        criteriac: '',
        ratec: '',
        fromc: '',
        toc:'',
        selectrangec:'',
        Nc:0,

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
            return "The "+this.selectrange +"  for"+this.N;
        },
        gridColumns: function(){
          return Object.keys(this.gridData[0]);
        },
        labels: function(){
          let a=[]
          this.gridData.map(x=>a.push(x.COUNTY))
          return a
        },
        row: function(){
          let a=[]
          this.gridData.map(x=>a.push(x.ATTRIBUTE1))
          return a
        }
      },
      methods: {
        submitSimple: function () {
      // send a GET REQUEST
      // GET /someUrl
      let url="http://localhost:5000/employment";
      let params={
        type: 'simple',
        selectrange: this.selectrange,
        criteria: this.criteria,
        N: this.N
      };
      console.log(params);
      this.$http.get(url,{params: params}).then((response) => {
          // get body data
          console.log("OUTPUT:");
          console.log(response.data);
          this.gridData=response.data;

        }).then(()=>{
          this.displayResult=true;
        }).catch((e)=>{
        console.log(e);})

      //Whatever data you get update the coloumn name accordingly



    },
    submitComplex: function () {
      // send a GET REQUEST
      // GET /someUrl
      let url="http://localhost:5000/employment";
      let params={
        type: 'complex',
        selectrangec: this.selectrangec,
        criteriac: this.criteriac,
        Nc: this.Nc,
        fromc: this.fromc,
        toc: this.toc,
        ratec:this.ratec

      };
      console.log(params);
      this.$http.get(url,{params: params}).then((response) => {
          // get body data
          console.log("OUTPUT:");
          console.log(response.data);
          this.gridData=response.data;

        }).then(()=>{
          this.displayResult=true;
        }).catch((e)=>{
        console.log(e);})

      //Whatever data you get update the coloumn name accordingly



    } 
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

