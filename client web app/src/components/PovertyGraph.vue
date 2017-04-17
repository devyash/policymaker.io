<template>

  <div class="PovertyGraph">


    <div class="container-fluid">
      <h1 class="page-header"> <i class="fa fa-tasks fa-fw"></i> Poverty Statistics</h1>
      <div class="row">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4 style="text-align:center"><i class="fa fa-bar-chart-o fa-fw"></i> Query to retrieve poverty average and employment average relationship.</h4>
          </div>  
          <div class= "panel-body">
            <form method="POST" class="form-inline" >
              <div class="form-group">
                <label class="col-2 col-form-label" for="selectrange">Order</label>
                <select v-model="selectrange" class="form-control" id="selectrange" required>
                  <option disabled value="">Please Select an Order</option>
                  <option>decreasing</option>
                  <option>increasing</option>
                </select>
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
            <h4 style="text-align:center"><i class="fa fa-bar-chart-o fa-fw"></i> Query to retrieve the state and county  with maximum adult or teen or children Population:</h4>
          </div>  
          <div class= "panel-body">
            <form method="POST" class="form-inline" >
              <div class="form-group">
                <label class="col-2 col-form-label" for="operationc">Operation:</label>
                <select v-model="operationc" class="form-control" id="selectrange" required>
                  <option disabled value="">Please Select a Max or Min</option>
                  <option>max</option>
                  <option>min</option>
                </select>


                <label class="col-2 col-form-label" for="criteriac">Criteria:</label>
                <select v-model="criteriac" class="form-control" id="selectrange" required>
                  <option disabled value="">Please Select a population group</option>
                  <option>adults</option>
                  <option>children</option>
                  <option>teens</option>
                </select>



                <label class="col-2 col-form-label" for="Nc" > N:</label>

                <input type="text" name="Value" v-model='Nc' required>



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
   <div class="row">
      <div class="panel panel-default" v-if="type=='simple'">
        <div class="panel-heading">
          <h4 style="text-align:left"> Back End QUERY</h4>
        </div>
        <div class="panel-body">
          <pre>                        create or replace package povertyanalysis as
    type outrec_typP IS RECORD (
        rowno number(20),
        state  varchar(100),
        county    varchar(100),
        poverty_average  integer,
        employment_average integer
      );   
    TYPE outrecset IS TABLE OF outrec_typP;
    function poverty_employment ( p_top varchar, p_nums number, p_order VARCHAR)
    return outrecset PIPELINED;
end povertyanalysis;
create or replace package body povertyanalysis IS
        
    function poverty_employment(p_top varchar, p_nums number, p_order varchar) 
    return outrecset pipelined
    is
        type ref0 is REF CURSOR;
        pov_cur ref0 ;
        out_rec outrec_typP;

    begin  

        IF pov_cur %ISOPEN THEN
          CLOSE pov_cur ;
        END IF;

        if p_top = 'top' and p_order = 'decreasing' then
        open pov_cur for 
        select ROWNUM,state,county,adults_per, employmentAvg from (select p.state as state, p.county as county, p.adults_per as adults_per, ((e.employed/e.civilian_labor_force)*100) as employmentAvg 
            from poverty p, employment e
            where   e.year=2015 and
            p.id = e.id and p.state = e.state  order by p.adults_per DESC) where ROWNUM <= p_nums; 
        elsif p_top='top' and p_order = 'increasing' then
        open pov_cur for 
        select ROWNUM,state,county,adults_per, employmentAvg from (select p.state, p.county, p.adults_per, ((e.employed/e.civilian_labor_force)*100) as employmentAvg 
        from poverty p, employment e
        where  e.year=2015 and
        p.id = e.id and p.state = e.state  order by p.adults_per asc) where rownum <= p_nums; 

        end if;

        loop
        exit when pov_cur%notfound;
        fetch pov_cur into out_rec;        
        pipe row(out_rec);
        end loop;

        close pov_cur;

    return;
    end;
    end povertyanalysis;</pre>
        </div>
      </div>
      <div class="panel panel-default" v-if="type=='complex'">
        <div class="panel-heading">
          <h4 style="text-align:left"> Backend Query 2</h4>
        </div>
        <div class="panel-body">
          <pre>create or replace package povertyanalysis1 as
    type outrec_typPP IS RECORD (
        rowno number(10),
        state  varchar(100),
        county    varchar(100),
        num_average integer
      );   
    TYPE outrecsetP IS TABLE OF outrec_typPP;
    function poverty_employmentP (p_max varchar,p_t varchar,p_nums number)
    return outrecsetP PIPELINED;
end povertyanalysis1;   
create or replace package body povertyanalysis1 IS        
    function poverty_employmentP(p_max varchar,p_t varchar,p_nums number) 
    return outrecsetP pipelined
    is
        type ref0 is REF CURSOR;
        pov_cur ref0 ;
        out_rec outrec_typPP;        
    begin          
        IF pov_cur %ISOPEN THEN
          CLOSE pov_cur ;
        END IF;        
       if p_max = 'max' and p_t = 'adults' then
        open pov_cur for 
        SELECT rownum, state,county,  max_adult 
            FROM (SELECT state, county,  MAX(adults_per) 
            AS max_adult  FROM POVERTY GROUP BY state,county ORDER BY max_adult desc)
            WHERE ROWNUM <= p_nums;            
        elsif p_max='min' and p_t = 'adults' then
            open pov_cur for 
            SELECT rownum,state,county,  max_adult 
            FROM (SELECT state, county, MIN(adults_per) 
            AS max_adult  FROM POVERTY GROUP BY state,county ORDER BY max_adult asc)
            WHERE ROWNUM <= p_nums;        
        elsif p_max = 'max' and p_t = 'teens' then
        open pov_cur for 
        SELECT rownum,state,county,  max_teen 
            FROM (SELECT state, county,  MAX(teens_per) 
            AS max_teen  FROM POVERTY GROUP BY state,county ORDER BY max_teen desc)
            WHERE ROWNUM <= p_nums;         
        elsif p_max='min' and p_t = 'teens' then
            open pov_cur for 
            SELECT rownum,state,county,  max_teen 
            FROM (SELECT state, county, MIN(teens_per) 
            AS max_teen  FROM POVERTY GROUP BY state,county ORDER BY max_teen asc)
            WHERE ROWNUM <= p_nums;        
        elsif p_max = 'max' and p_t = 'children' then
        open pov_cur for 
        SELECT rownum,state,county,  max_children 
            FROM (SELECT state, county,  MAX(children_per) 
            AS max_children  FROM POVERTY GROUP BY state,county ORDER BY max_children desc)
            WHERE ROWNUM <= p_nums;            
        ELSE 
            open pov_cur for 
            SELECT rownum,state,county,  min_children 
            FROM (SELECT state, county, MIN(children_per) 
            AS min_children  FROM POVERTY GROUP BY state,county ORDER BY min_children asc)
            WHERE ROWNUM <= p_nums;        
        end if;        
        loop
        exit when pov_cur%notfound;
        fetch pov_cur into out_rec;        
        pipe row(out_rec);
        end loop;        
        close pov_cur;        
    return;
    end;
    end povertyanalysis1;   </pre>
        </div>
      </div>
    </div>

      <!-- ---------------------------------------------------------------->





</div>
<!--   <pre>{{ $data }}</pre>  --> 
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
        operationc:'',
        criteriac: '',
        Nc:0,
        gridData: [],
        someData: "",
        displayResult: false,
        donutData: [
        { label: 'Adults', value: 300 },
        { label: 'Teens', value: 124 },
        { label: 'children', value: 200 }
        ]
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
            return "Poverty Result Graph" ;
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
            this.gridData.map(x=>a.push(x.POVERTY_AVERAGE))
            return a
          }
          else if(this.type=="complex"){
            let a=[]
            this.gridData.map(x=>a.push(x.NUM_AVERAGE))
            return a
          }
        }
      },
      methods: {
        submitSimple: function () {
      // send a GET REQUEST
      // GET /someUrl
      let url="http://localhost:5000/poverty";
      this.type="simple"
      let params={
        type: this.type,
        selectrange: this.selectrange,
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
      let url="http://localhost:5000/poverty";
      let params={
        type: this.type,
        criteriac: this.criteriac,
        Nc: this.Nc,
        operationc:this.operationc
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

