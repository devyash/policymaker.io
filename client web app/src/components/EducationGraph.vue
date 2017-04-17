<template>

  <div class="EducationGraph">


    <div class="container-fluid">
      <h1 class="page-header"> <i class="fa fa-tasks fa-fw"></i> Education Statistics</h1>
      <div class="row">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 style="text-align:left"><i class="fa fa-bar-chart-o fa-fw"></i> Query to analyze the state/county having low literacy rate based on school diploma to college graduates statistics and which are also below the poverty threshold based on the median household income.</h4>
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
            <h4 style="text-align:left"><i class="fa fa-bar-chart-o fa-fw"></i> Query to perform state/county education assessment based on graduation rate gap improvement(if exists) from one year to another and retrieve the state/county along with their improved education gap.</h4>
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
      <div class="panel panel-default" v-if="type=='simple'">
        <div class="panel-heading">
          <h4 style="text-align:left">BackEnd Magic</h4>
        </div>
        <div class="panel-body">
          <pre>CREATE OR REPLACE PACKAGE edu_pkg1 IS

  TYPE outrec_typ IS RECORD (
   rowno NUMBER(20),
    STATE  VARCHAR(2),
    COUNTY VARCHAR2(30),
    literacy_percentage NUMBER(20,4)
  );

  TYPE outrecset IS TABLE OF outrec_typ;

  FUNCTION edu_litpov_fun(n NUMBER) RETURN outrecset PIPELINED;
END edu_pkg1;
/

CREATE OR REPLACE PACKAGE BODY edu_pkg1 IS

FUNCTION edu_litpov_fun(n in NUMBER) return outrecset PIPELINED IS

out_rec outrec_typ;
TYPE ref0 IS REF CURSOR;
c0 ref0;

BEGIN

open c0 for
select ROWNUM, state, county, literacy_percentage  from( select s.state as state, s.county as county, (s.p_Less_School_Diploma + s.p_School_Diploma) as literacy_percentage from education s where exists( 
(select state,county from education where (p_Less_School_Diploma + p_School_Diploma )> (P_Some_College + P_4_Years_college) and state = s.state and county = s.county) 
minus 
(select state,county from poverty where med_household_inc > (Select avg(med_household_inc) from poverty) and state = s.state and county = s.county)
) order by literacy_percentage) where ROWNUM <=N;

loop
 EXIT WHEN c0%NOTFOUND;
 FETCH c0 INTO out_rec.rowno, out_rec.state,out_rec.county, out_rec.literacy_percentage;
 Pipe row(out_rec);
 end loop;
 close c0; 

RETURN;
END edu_litpov_fun;
END edu_pkg1;
/</pre>
        </div>
      </div>
      <div class="panel panel-default" v-if="type=='complex'">
        <div class="panel-heading">
          <h4 style="text-align:left">Back End Magic</h4>
        </div>
        <div class="panel-body">
          <pre>
            CREATE OR REPLACE PACKAGE edu_pkg2 IS

  TYPE outrec_typ IS RECORD (
   rowno NUMBER,
   state EDUCATION.STATE%TYPE,
   county EDUCATION.county%TYPE,
 education_gap_rise EDUCATION.college_or_higher%TYPE
  );

TYPE outrec_typ2 IS RECORD (
    state EDUCATION.STATE%TYPE,
    county EDUCATION.county%TYPE,
    education_gap_rise EDUCATION.college_or_higher%TYPE
  );  
  TYPE outrecset IS TABLE OF outrec_typ;
  
  FUNCTION edu_gap_fun(from_year NUMBER, to_year NUMBER) RETURN outrecset PIPELINED;
END edu_pkg2;
/

CREATE OR REPLACE PACKAGE BODY edu_pkg2 IS

FUNCTION edu_gap_fun(from_year in NUMBER, to_year in NUMBER) RETURN outrecset  pipelined is

CURSOR c1 is 

select state, county, abs(college_or_higher - less_school_diploma) as from_gap from education where year = from_year order by from_gap;

to_gap NUMBER;
out_rec outrec_typ;
out_rec3 outrec_typ2;
out_rec2 outrec_typ2;
l_row NUMBER := 0;

BEGIN 
OPEN c1;

LOOP
FETCH c1 INTO out_rec2;
EXIT WHEN C1%NOTFOUND; 

SELECT state,county,abs(college_or_higher - less_school_diploma) as to_gap into out_rec3 from education where year = to_year and state = out_rec2.state and county = out_rec2.county;

If  out_rec3.education_gap_rise > out_rec2.education_gap_rise then
    l_row := l_row + 1;
    out_rec.rowno := l_row; 
  out_rec.state := out_rec3.state;
  out_rec.county := out_rec3.county;
  out_rec.education_gap_rise := out_rec3.education_gap_rise - out_rec2.education_gap_rise;
Pipe row (out_rec);
END IF;
  
End loop;

return; 
END edu_gap_fun;
END edu_pkg2;
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
        N:0,
        fromyear:'',
        toyear:'',
          gridData: [],
          someData: "",
          displayResult: false,
          donutData: [
          { label: 'Educated', value: 102 },
          { label: 'Uneducated', value: 10 }
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
            this.gridData.map(x=>a.push(x.EDUCATION_GAP_RISE))
            return a
          }
        }
      },
      methods: {
        submitSimple: function () {
      // send a GET REQUEST
      // GET /someUrl
      let url="http://localhost:5000/education";
      this.type="simple"
      let params={
        type: this.type,
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
      let url="http://localhost:5000/education";
      let params={
        type: this.type,
        fromyear: this.fromyear,
        toyear: this.toyear,

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

