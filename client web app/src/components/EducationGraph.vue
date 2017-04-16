<template>

  <div class="EducationGraph">


    <div class="container-fluid">
      <h1 class="page-header">Education Statistics</h1>
      <div class="row">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 style="text-align:left">Query to analyze the state/county having low literacy rate based on school diploma to college graduates statistics and which are also below the poverty threshold based on the median household income.</h4>
          </div>  
          <div class= "panel-body">
            <form method="POST" class="form-inline" >
              <div class="form-group">

                <label class="col-2 col-form-label" for="N" > N:</label>

                <input type="text" name="Value" v-model='N' required>
                
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
            <h4 style="text-align:left">Query to perform state/county education assessment based on graduation rate gap improvement(if exists) from one year to another and retrieve the state/county along with their improved education gap.</h4>
          </div>  
          <div class= "panel-body">
            <form method="POST" class="form-inline" >
              <div class="form-group">




                <label class="col-2 col-form-label" for="fromyear">From:</label>
                <select v-model="fromyear" class="form-control" id="fromyear" required>
                  <option disabled value="">Please Select a Starting Year</option>
                  <option>1970</option>
                  <option>1980</option>
                  <option>1990</option>
                  <option>2000</option>
                  <option>2014</option>
                </select>


                <label class="col-2 col-form-label" for="toyear">to:</label>
                <select v-model="toyear" class="form-control" id="toyear" required>
                  <option disabled value="">Please Select a Ending Year</option>
                  <option>1970</option>
                  <option>1980</option>
                  <option>1990</option>
                  <option>2000</option>
                  <option>2014</option>
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
        N:0,
        fromyear:'',
        toyear:'',
          gridData: [],
          someData: "",
          displayResult: false,
          donutData: [
          { label: 'Employed', value: 300 },
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

