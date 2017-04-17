<template>
<div>
       <!--  <div id="page-wrapper"> -->
<!--             <div class="row"> -->
<!--                 <div class="col-lg-12"> -->
                    <h1 class="page-header">Dashboard</h1>
<!--                 </div> -->
                <!-- /.col-lg-12 -->
<!--             </div> -->
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-tasks fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div>Education</div>
                                </div>
                            </div>
                        </div>
                      <router-link to="/educationgraph">
                            <div class="panel-footer">
                                <span class="pull-left">View Details</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                            </router-link>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-green">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-tasks fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div>Employement</div>
                                </div>
                            </div>
                        </div>
                          <router-link to="/employment/simple">
                            <div class="panel-footer">
                                <span class="pull-left">View Details</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </router-link>  
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-yellow">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-tasks fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div>Population</div>
                                </div>
                            </div>
                        </div>
                        <router-link to="/populationgraph">
                            <div class="panel-footer">
                                <span class="pull-left">View Details</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-red">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-tasks fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div>Poverty</div>
                                </div>
                            </div>
                        </div>
                        <router-link to="povertygraph">
                            <div class="panel-footer">
                                <span class="pull-left">View Details</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-8">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <i class="fa fa-bar-chart-o fa-fw"></i> Popular Queries
                            <div class="pull-right">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                                        Actions
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu pull-right" role="menu">
                                        <li><a href="#">Action</a>
                                        </li>
                                        <li><a href="#">See for Education</a>
                                        </li>
                                        <li><a href="#">See for Employement</a>
                                        </li>
                                        <li><a href="#">See for Population</a>
                                        </li>
                                        <li><a href="#">See for Poverty</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <div id="morris-area-chart">
                                                        <!-- Popular Query Body-->
                            <form class="form-inline">
                            <label>Total Data in </label>
                            <select class="col-form-label" v-model="type">
                                <option>population</option>
                                <option>education</option>
                                <option>poverty</option>
                                <option>employment</option>
                                <option>Total_Data</option>
                            </select>
                            <button class="btn-primary" v-on:click.prevent=getSize()>Get Size</button>
                            </form>
                            </div>
<!-- -------------MODAL -->
  <modal v-if="showModal" @close="showModal = false" :modaltitle="modaltitle" :modalbody="modalbody"></modal>
<!-- -------------- -->






<!-- ----------- -->







                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->

                    <!-- /.panel -->
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <i class="fa fa-clock-o fa-fw"></i> Policy Timeline
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <ul class="timeline">
                                <li>
                                    <div class="timeline-badge"><i class="fa fa-check"></i>
                                    </div>
                                    <div class="timeline-panel">
                                        <div class="timeline-heading">
                                            <h4 class="timeline-title">Surveyor enters new field data</h4>
                                            <p><small class="text-muted"><i class="fa fa-clock-o"></i> Day 1</small>
                                            </p>
                                        </div>
                                        <div class="timeline-body">
                                            <p>Government appoints various officials to survey and find important data related to their locality. The surveyors enter this collected data after verification of authentication from a superior authority into the system.</p>
                                        </div>
                                    </div>
                                </li>
                                <li class="timeline-inverted">
                                    <div class="timeline-badge warning"><i class="fa fa-credit-card"></i>
                                    </div>
                                    <div class="timeline-panel">
                                        <div class="timeline-heading">
                                            <h4 class="timeline-title">Government Supervisor approves the data</h4>
                                                <p><small class="text-muted"><i class="fa fa-clock-o"></i> Day 5-7</small>
                                            </p>
                                        </div>
                                        <div class="timeline-body">
                                            <p>There is hierarchial structure of supervisors who have specific domain knowledge.</p>
                                            <p>They check the authenticity of the entered data for various anomalies.Once this data is verified the data passes to next stage.</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="timeline-badge danger"><i class="fa fa-bomb"></i>
                                    </div>
                                    <div class="timeline-panel">
                                        <div class="timeline-heading">
                                            <h4 class="timeline-title">Data Analyst analyse the data</h4>
                                                <p><small class="text-muted"><i class="fa fa-clock-o"></i> Day 30</small>
                                            </p>                                        </div>
                                        <div class="timeline-body">
                                            <p>Data Analyst aggregate the data from various domains, states and analyse this data to find key insights. They write queries and code that form the crux behind this platform.</p>
                                        </div>
                                    </div>
                                </li>
                                <li class="timeline-inverted">
                                    <div class="timeline-panel">
                                        <div class="timeline-heading">
                                            <h4 class="timeline-title">Domain Guru's Verify the Analysis</h4>
                                                <p><small class="text-muted"><i class="fa fa-clock-o"></i> Day 45</small>
                                            </p>
                                        </div>
                                        <div class="timeline-body">
                                            <p>PolicyMaker.io hires various Domain 'Gurus' who verify this analysis. These Domain Gurus are expert with various years of knowledge under their belt who consult the Data Analyst regarding their repective fields. Providing an Outside Eye</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="timeline-badge info"><i class="fa fa-save"></i>
                                    </div>
                                    <div class="timeline-panel">
                                        <div class="timeline-heading">
                                            <h4 class="timeline-title">Policy drafter be Amazed!</h4>
                                                <p><small class="text-muted"><i class="fa fa-clock-o"></i> Day 60</small>
                                            </p>
                                        </div>
                                        <div class="timeline-body">
                                            <p>The Analysis is then provided to policy drafters who use this analysis to make better decisions. The key insights our platform provides help them be better decison makers. They use drop downs as below to learn about the different domains.</p>
                                            <hr>
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown">
                                                    <i class="fa fa-gear"></i> <span class="caret"></span>
                                                </button>
                                                <ul class="dropdown-menu" role="menu">
                                                    <li><a href="#">See Popular Queries</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="timeline-panel">
                                        <div class="timeline-heading">
                                            <h4 class="timeline-title">New Policy is Drafted!</h4>
                                                <p><small class="text-muted"><i class="fa fa-clock-o"></i> Day 120</small>
                                            </p>
                                        </div>
                                        <div class="timeline-body">
                                            <p>The policy drafter after months of arduous hardwork submit a draft proposal to  Policymaker.io which is put sent ahead to the head Policy Maker.</p>
                                        </div>
                                    </div>
                                </li>
                                <li class="timeline-inverted">
                                    <div class="timeline-badge success"><i class="fa fa-graduation-cap"></i>
                                    </div>
                                    <div class="timeline-panel">
                                        <div class="timeline-heading">
                                            <h4 class="timeline-title">Decision Maker Approves the draft Propsal!</h4>
                                                <p><small class="text-muted"><i class="fa fa-clock-o"></i> Day 180</small>
                                            </p>
                                        </div>
                                        <div class="timeline-body">
                                            <p>The head Policy Maker reviews the draft policy and submits the draft proposal to the CongressMen who review the policies and submit them to senate.</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                </div>
                <!-- /.col-lg-8 -->
                <div class="col-lg-4">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <i class="fa fa-tasks fa-fw"></i> Pending Polcies
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <div class="list-group">
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-upload fa-fw"></i> ABC Policy
                                    <span class="pull-right text-muted small"><em>11-2-2016</em>
                                    </span>
                                </a>
                            </div>
                            <!-- /.list-group -->
                            <a href="#" class="btn btn-default btn-block">View All Pending Policies</a>
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->

                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <i class="fa fa-bell fa-fw"></i> Pending Survey Data
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <div class="list-group">
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-upload fa-fw"></i> Florida Data
                                    <span class="pull-right text-muted small"><em>11-2-2016</em>
                                    </span>
                                </a>
                            </div>
                            <!-- /.list-group -->
                            <a href="#" class="btn btn-default btn-block">View All Pending Survey data</a>
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->

                    <!-- /.panel .chat-panel -->
                </div>
                <!-- /.col-lg-4 -->
            </div>
            <!-- /.row -->
        </div>
<!--         /#page-wrapper -->



</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      type:"",
      showModal:false,
      modalbody:"0",
    };
  },
  methods:{
     getSize: function () {
      // send a GET REQUEST
      // GET /someUrl
      let url="http://localhost:5000/totaldata";
      let params={
        type: this.type,
      };
      console.log(params);
      this.$http.get(url,{params: params}).then((response) => {
          // get body data
          console.log("OUTPUT:");
          console.log(response.data);
          
          if(this.type=="Total_Data"){
            this.modalbody=response.data[0].SUMTOTAL*1;
          
        }else{
            this.modalbody=response.data[0].SUMTOTAL*2;
        }

        }).then(()=>{
          this.showModal=true;
        }).catch((e)=>{
          console.log(e);})
  }
}}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
