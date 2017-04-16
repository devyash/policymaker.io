<template>

  <div class="PopulationGraph">


    <div class="container-fluid">
      <h1 class="page-header">Population Statistics</h1>
      <div class="row">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 style="text-align:center">Analyzing the major factor behind population growth across all states and counties from one year to another year:</h4>
          </div>  
          <div class= "panel-body">
            <form method="POST" class="form-inline" >
              <div class="form-group">
                

                <label class="col-2 col-form-label" for="fromyear">From:</label>
                <select v-model="fromyear" class="form-control" id="fromyear" required>
                  <option disabled value="">Please Select a Starting Year</option>
                  <option v-for="n in 5">{{n+2010}}</option>
                </select>


                <label class="col-2 col-form-label" for="toyear">To:</label>
                <select v-model="toyear" class="form-control" id="toyear" required>
                  <option disabled value="">Please Select a Ending Year</option>
                  <option v-for="n in 5">{{n+2010}}</option>
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
            <h4 style="text-align:left"> Analyzing states and counties based on multiple parameters like Domestic Migrants, International Migrants, Births and Deaths.</h4>
          </div>  
          <div class= "panel-body">
            <form method="POST" class="form-inline" >
              <div class="form-group">
                <label class="col-2 col-form-label" for="parameter1">Parameter 1:</label>
                <select v-model="parameter1" class="form-control" id="parameter1" required>
                  <option disabled value="">Please Select a parameter value</option>
                  <option>domestic_migration</option>
                  <option>births</option>
                </select>


                <label class="col-2 col-form-label" for="parameter2">Parameter 2:</label>
                <select v-model="parameter2" class="form-control" id="parameter2" required>
                  <option disabled value="">Please Select a paramter value</option>
                  <option>international_migration</option>
                  <option>deaths</option>
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
        fromyear: '',
        toyear: '',
        parameter1:'',
        parameter2:'',  
        criteria: '',
          gridData: [],
          someData: "",
          displayResult: false,
          donutData: [
          { label: 'Employed', value: 300 },
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
            return "The first "+this.N+" Counties in "+this.selectrange +" order based on "+this.capitalizeFirstLetter(this.criteria)+" people" ;
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
          if(this.type=="simple"){
            let a=[]
            this.gridData.map(x=>a.push(x.ATTRIBUTE1))
            return a
          }
          else if(this.type=="complex"){
            let a=[]
            this.gridData.map(x=>a.push(x.RATE))
            return a
          }
        }
      },
      methods: {
        submitSimple: function () {
      // send a GET REQUEST
      // GET /someUrl
      let url="http://localhost:5000/employment";
      this.type="simple"
      let params={
        type: this.type,
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
      this.type='complex';
      let url="http://localhost:5000/employment";
      let params={
        type: this.type,
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



    },
    capitalizeFirstLetter: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

