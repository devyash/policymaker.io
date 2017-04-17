<template>

  <div class="PopulationGraph">


    <div class="container-fluid">
      <h1 class="page-header"> <i class="fa fa-tasks fa-fw"></i> Population Statistics</h1>
      <div class="row">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 style="text-align:center"><i class="fa fa-bar-chart-o fa-fw"></i> Analyzing the major factor behind population growth across all states and counties from one year to another year:</h4>
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
            <h4 style="text-align:left"><i class="fa fa-bar-chart-o fa-fw"></i>  Analyzing states and counties based on multiple parameters like Domestic Migrants, International Migrants, Births and Deaths.</h4>
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
      <div class="panel panel-default" v-if="type=='simple'">
        <div class="panel-heading">
          <h4 style="text-align:left"> Backend Query</h4>
        </div>
        <div class="panel-body">
          <pre>
            create or replace PACKAGE BODY PQUERY1 IS 

FUNCTION POP_QUERY1 ( FACTOR_String IN VARCHAR , YEAR1 IN POPULATION.YEAR%TYPE , YEAR2 IN POPULATION.YEAR%TYPE)
 RETURN OUTPUTTABLE PIPELINED IS

CURSOR C IS 
(SELECT STATE, COUNTY , POP_GROWTH,BIRTH_SUM,DEATH_SUM,DOM_SUM, INT_SUM 
FROM (SELECT state,county, SUM(BIRTHS) AS BIRTH_SUM , SUM(DEATHS) AS DEATH_SUM , SUM(DOMestic_MIG) AS DOM_SUM ,
SUM(INTernational_MIG) AS INT_SUM,
(SUM(BIRTHS) -SUM(DEATHS) + SUM(DOMestic_MIG) + SUM(INTernational_MIG) ) AS POP_GROWTH FROM
(SELECT * FROM  POPULATION WHERE YEAR BETWEEN 2011 AND 2015)
GROUP BY STATE,COUNTY));
max1 NUMBER(20);

BEGIN 
for i IN C
LOOP 
fetch i INTO FACTORS_ROW;
   X := FACTORs_ROW.BIRTHS_SUM;
  Y := FACTORs_ROW.DOM_SUM;
  Z:= FACTORs_ROW.INT_SUM;
  IF X>Y THEN max1:=X; ELSE max1 := Y; END IF;  IF max1 > Z THEN max1:=max1; ELSE max1:=Z;  END IF;
  OUTPUT.STATE := FACTORS_ROW.STATE;
  Output.county:= Factors_row.county;

OUTPUT.CONTRINUTION_FACTOR := Factor_string;
OUTPUT.CONTRIBUTION := max1;
PIPE ROW(OUTPUT); 
end loop

RETURN;

END POP_QUERY1;
END PACKAGEQUERY1;
          </pre>
        </div>
      </div>
      <div class="panel panel-default" v-if="type=='complex'">
        <div class="panel-heading">
          <h4 style="text-align:left"> Back End Query</h4>
        </div>
        <div class="panel-body">
          <pre>CREATE OR REPLACE PACKAGE POP_QUERY2 AS

TYPE OUTPUT_STRUCTURE IS RECORD
(
 STATE VARCHAR2(100),
 COUNTY VARCHAR2(100)
);

OUTPUT_ROW OUTPUT_STRUCTURE;
TYPE OUTPUTTABLE IS TABLE OF OUTPUT_STRUCTURE;
FUNCTION RESULT1 ( PAR1 IN VARCHAR, PAR2 IN VARCHAR) RETURN OUTPUTTABLE PIPELINED;
END POP_QUERY2;
/

CREATE OR REPLACE PACKAGE BODY POP_QUERY2 IS

 fUNCTION RESULT1 ( PAR1 VARCHAR, PAR2 VARCHAR) RETURN  OUTPUTTABLE PIPELINED IS
 
 cursor c1 is  (Select * from (
select state,county  from population
group by state,county
order by sum(Domestic_mig) Desc)
where ROWNUM<=1000)
INTERSECT
 (Select * from (
select state,county  from population
group by state,county
order by sum(Deaths) DESC )
where ROWNUM<=1000);

cursor c2 is (Select * from (
select state,county  from population
group by state,county
order by sum(Domestic_mig) Desc)
where ROWNUM<=1000)
INTERSECT
(select * from (
select state,county  
from population
group by state,county
order by sum(International_Mig) DESC)
where ROWNUM<=1000);

 CURSOR C3 IS (Select * from (
select state,county  from population 
group by state,county
order by sum(Births) Desc)
where ROWNUM<=1000)
INTERSECT
(select * from (
select state,county  from population 
group by state,county
order by sum(International_Mig) DESC)
where ROWNUM<=1000);

CURSOR C4 IS (Select * from (
select state,county  from population 
group by state,county
order by sum(Births) Desc
)Where ROWNUM<=1000)
INTERSECT
(Select * from (
select state,county  from population 
group by state,county
order by sum(Deaths) DESC)
where ROWNUM<=1000);

BEGIN

 if (PAR1 = 'domestic_migration' and PAR2 = 'international_migration')
 then
OPEN C1;
LOOP
FETCH C1 INTO OUTPUT_ROW;
EXIT WHEN C1%NOTFOUND;
PIPE ROW(OUTPUT_ROW);
END LOOP;
 CLOSE C1;
RETURN;
 end if;

 if (PAR1 = 'domestic_migration'  AND PAR2 = 'deaths') then
 OPEN C2;
LOOP

FETCH C2 INTO OUTPUT_ROW;
EXIT WHEN C2%NOTFOUND;
PIPE row(OUTPUT_ROW);
END LOOP;
CLOSE C2;
RETURN;

 end if;

 if (PAR1 = 'births' and PAR2 = 'international_migration') then
 OPEN C3;
LOOP

FETCH C3 INTO OUTPUT_ROW;
EXIT WHEN C3%NOTFOUND;
PIPE row(OUTPUT_ROW);
END LOOP;
RETURN;
CLOSE C3;
 end if;

 if (PAR1 = 'births'  AND PAR2 = 'deaths') then
 OPEN C4;
LOOP

FETCH C4 INTO OUTPUT_ROW;
EXIT WHEN C4%NOTFOUND;
PIPE row(OUTPUT_ROW);
END LOOP;
RETURN;
CLOSE C4;
 end if;

END RESULT1;
END POP_QUERY2;
/

select * from Table(POP_QUERY2.RESULT1('domestic_migratiom','international_migration'));</pre>
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
            this.gridData.map(x=>a.push(x.CONTRIBUTION_FACTOR))
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
      let url="http://localhost:5000/population";
      this.type="simple"
      let params={
        type: this.type,
        fromyear: this.fromyear,
        toyear: this.toyear
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
      let url="http://localhost:5000/population";
      let params={
        type: this.type,
        parameter1: this.parameter1,
        parameter2: this.parameter2

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

