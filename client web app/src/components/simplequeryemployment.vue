<template>

  <div class="simplequeryemployment">


    <div class="container-fluid">
      <h1 class="page-header"><i class="fa fa-tasks fa-fw"></i> Employment Statistics</h1>
      <div class="row">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 style="text-align:left"><i class="fa fa-bar-chart-o fa-fw"></i>Query to retrieve the required leading/trailing states/counties based on employment/unemployment criteria filtering.</h4>
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
            <h4 style="text-align:left"><i class="fa fa-bar-chart-o fa-fw"></i>Query to retrieve the state/county along with the corresponding growth/decline rate trends in employment/unemployment from given year to other:</h4>
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
            <table class="table table-striped table-bordered table-hover">
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
            <activity-graph :labels=labels() :row=row() :name=name></activity-graph>
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
      <div class="panel panel-default" v-if="type=='simple'">
        <div class="panel-heading">
          <h4 style="text-align:left"> Backend Query</h4>
        </div>
        <div class="panel-body">
          <pre>CREATE OR REPLACE PACKAGE emp_pkg1 IS
  TYPE outrec_typ IS RECORD (
    row NUMBER(20), 
    state  VARCHAR(2),
    county VARCHAR2(30),
  attribute1 NUMBER(10)
  );
  TYPE outrecset IS TABLE OF outrec_typ;
  FUNCTION emp_topbot_fun (top_bot IN VARCHAR, attribute1 IN VARCHAR, N1 IN NUMBER) RETURN outrecset PIPELINED;
END emp_pkg1;
/
CREATE or replace PACKAGE BODY emp_pkg1 IS

 FUNCTION emp_topbot_fun(top_bot IN VARCHAR, attribute1 IN VARCHAR, N1 IN NUMBER) return outrecset Pipelined IS
Out_rec outrec_typ;
TYPE         ref0 IS REF CURSOR;
cur0         ref0;


BEGIN

If attribute1 = 'employed' and top_bot = 'decreasing' then
open cur0 for

SELECT rownum,state,county, s_employed FROM (SELECT state, county,  SUM(EMPLOYED) AS S_EMPLOYED  FROM EMPLOYMENT GROUP BY state,county ORDER BY S_EMPLOYED desc)
WHERE ROWNUM <= n1;

Elsif attribute1 = 'unemployed' and top_bot = 'decreasing' then
open cur0 for
SELECT rownum,state,county, s_unemployed FROM (SELECT state, county,  SUM(unEMPLOYED) AS S_unEMPLOYED  FROM EMPLOYMENT GROUP BY state,county ORDER BY S_unEMPLOYED desc)
WHERE ROWNUM <= n1;
Elsif attribute1 = 'employed' and top_bot = 'increasing' then
open cur0 for
SELECT rownum,state,county, s_employed  
FROM (SELECT state, county,  SUM(EMPLOYED) AS S_EMPLOYED  FROM EMPLOYMENT GROUP BY state,county ORDER BY S_EMPLOYED)
WHERE ROWNUM <= n1;
Else  
open cur0 for
  SELECT rownum, state,county, s_unemployed 
  FROM (SELECT state, county,  SUM(unEMPLOYED) AS S_unEMPLOYED  FROM EMPLOYMENT GROUP BY state,county ORDER BY S_unEMPLOYED )
WHERE ROWNUM <= n1;


End if;

loop
 EXIT WHEN cur0%NOTFOUND;
 FETCH cur0 INTO out_rec.row, out_rec.state,    out_rec.county,  
                    out_rec.attribute1;
 Pipe row(out_rec);

 end loop;
 close cur0; 
    

RETURN;

END emp_topbot_fun;
END emp_pkg1;
/

select * from TABLE(emp_pkg1.emp_topbot_fun(‘increasing’,’employed’, 10 ));</pre>
        </div>
      </div>
      <div class="panel panel-default" v-if="type=='complex'">
        <div class="panel-heading">
          <h4 style="text-align:left"> BackEnd Query</h4>
        </div>
        <div class="panel-body">
          <pre>
            CREATE OR REPLACE PACKAGE emp_pkg2 IS
  TYPE outrec_typ IS RECORD (
    rowno NUMBER(20),
    state  VARCHAR(2),
    county VARCHAR2(30),
    rate NUMBER(20,3)
  );
  TYPE outrecset IS TABLE OF outrec_typ;
  FUNCTION emp_growthdecline_fun(from_year in NUMBER, to_year in NUMBER, rate_typ IN VARCHAR2, attribute1 VARCHAR2, order_typ VARCHAR2, N NUMBER) RETURN outrecset PIPELINED;
END emp_pkg2;
/
CREATE or replace PACKAGE BODY emp_pkg2 IS

FUNCTION emp_growthdecline_fun(from_year in NUMBER, to_year in NUMBER, rate_typ IN VARCHAR2, attribute1 VARCHAR2, order_typ VARCHAR2, N NUMBER) return outrecset Pipelined IS
Out_rec outrec_typ;
TYPE ref0 IS REF CURSOR;
c0 ref0;

BEGIN

If attribute1 = 'employed' and rate_typ = 'growth' and order_typ = 'increasing' then
open c0 for
select ROWNUM, state, county, rate from (SELECT T1.STATE as state, T1.COUNTY as county, round(((T2.EMPLOYED - T1.EMPLOYED)/(T1.employed)),3) AS RATE FROM employment T1 CROSS JOIN employment T2 WHERE T1.STATE = T2.STATE AND T1.COUNTY = T2.COUNTY AND T1.YEAR = from_year AND T2.YEAR = to_year AND T1.STATE = T2.state and t2.employed > t1.employed ORDER BY rate DESC) where ROWNUM <=N; 

elsIf attribute1 = 'unemployed' and rate_typ = 'growth' and order_typ = 'increasing' then
open c0 for
select ROWNUM, state, county, rate from (SELECT T1.STATE as state, T1.COUNTY as county, round(((T2.unEMPLOYED - T1.unEMPLOYED)/(T1.unemployed)),3) AS RATE FROM employment T1 CROSS JOIN employment T2 WHERE T1.STATE = T2.STATE AND T1.COUNTY = T2.COUNTY AND T1.YEAR = from_year AND T2.YEAR = to_year AND T1.STATE = T2.state and t2.unemployed > t1.unemployed ORDER BY rate DESC) where ROWNUM <=N; 

elsIf attribute1 = 'employed' and rate_typ = 'decline' and order_typ = 'increasing' then
open c0 for
select ROWNUM, state, county, RATE from (SELECT T1.STATE as state, T1.COUNTY as county, round(((T1.EMPLOYED - T2.EMPLOYED)/(T1.employed)),3) AS RATE FROM employment T1 CROSS JOIN employment T2 WHERE T1.STATE = T2.STATE AND T1.COUNTY = T2.COUNTY AND T1.YEAR = from_year AND T2.YEAR = to_year AND T1.STATE = T2.state and t1.employed > t2.employed ORDER BY rate desc) where ROWNUM <=N; 

elsIf attribute1 = 'unemployed' and rate_typ = 'decline' and order_typ = 'increasing' then
open c0 for
select ROWNUM, state, county, rate from (SELECT T1.STATE as state, T1.COUNTY as county, round(((T1.unEMPLOYED - T2.unEMPLOYED)/(T1.unemployed)),3) AS RATE FROM employment T1 CROSS JOIN employment T2 WHERE T1.STATE = T2.STATE AND T1.COUNTY = T2.COUNTY AND T1.YEAR = from_year AND T2.YEAR = to_year AND T1.STATE = T2.state and t1.unemployed > t2.unemployed ORDER BY rate desc) where ROWNUM <=N; 

elsIf attribute1 = 'employed' and rate_typ = 'growth' and order_typ = 'decreasing' then
open c0 for
select ROWNUM, state, county, rate from (SELECT T1.STATE as state, T1.COUNTY as county, round(((T2.EMPLOYED - T1.EMPLOYED)/(T1.employed)),3) AS RATE FROM employment T1 CROSS JOIN employment T2 WHERE T1.STATE = T2.STATE AND T1.COUNTY = T2.COUNTY AND T1.YEAR = from_year AND T2.YEAR = to_year AND T1.STATE = T2.state and t2.employed > t1.employed ORDER BY rate) where ROWNUM <=N; 

elsIf attribute1 = 'employed' and rate_typ = 'decline' and order_typ = 'decreasing' then
open c0 for
select ROWNUM, state, county, rate from (SELECT T1.STATE as state, T1.COUNTY as county, round(((T1.EMPLOYED - T2.EMPLOYED)/(T1.employed)),3) AS RATE FROM employment T1 CROSS JOIN employment T2 WHERE T1.STATE = T2.STATE AND T1.COUNTY = T2.COUNTY AND T1.YEAR = from_year AND T2.YEAR = to_year AND T1.STATE = T2.state and t1.employed > t2.employed ORDER BY rate) where ROWNUM <=N; 

elsIf attribute1 = 'unemployed' and rate_typ = 'decline' and order_typ = 'decreasing' then
open c0 for
select ROWNUM, state, county, rate from (SELECT T1.STATE as state, T1.COUNTY as county, round(((T1.unEMPLOYED - T2.unEMPLOYED)/(T1.unemployed)),3) AS RATE FROM employment T1 CROSS JOIN employment T2 WHERE T1.STATE = T2.STATE AND T1.COUNTY = T2.COUNTY AND T1.YEAR = from_year AND T2.YEAR = to_year AND T1.STATE = T2.state and t1.unemployed > t2.unemployed ORDER BY rate) where ROWNUM <=N; 

else
open c0 for
select ROWNUM, state, county , rate from (SELECT T1.STATE as state, T1.COUNTY as county, round(((T2.unemployed - T1.unemployed)/(T1.unemployed)),3) AS RATE FROM employment T1 CROSS JOIN employment T2 WHERE T1.STATE = T2.STATE AND T1.COUNTY = T2.COUNTY AND T1.YEAR = from_year AND T2.YEAR = to_year AND T2.unemployed > T1.unemployed ORDER BY rate) where ROWNUM <=N;
  

End if;

loop
 EXIT WHEN c0%NOTFOUND;
 FETCH c0 INTO out_rec.rowno, out_rec.state,out_rec.county,  
                    out_rec.rate;
 Pipe row(out_rec);
 end loop;
 close c0; 
    
RETURN;

END emp_growthdecline_fun;
END emp_pkg2;
/
          </pre>
        </div>
      </div>
    </div>

    <!-- ---------------------------------------------------------------->





  </div>
  <!--   <pre>{{ $data }}</pre>   -->
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
    ,
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
  }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

