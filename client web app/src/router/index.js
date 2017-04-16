import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import EducationGraph from '@/components/EducationGraph';
import newpolicyform from '@/components/newpolicyform';
import simplequeryemployment from '@/components/simplequeryemployment';
import Maps from '@/components/Maps';

import ActivityGraph from '@/components/ActivityGraph';

//Vue Axios (Basically fetch)
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)


// // Do not forget to import raphael
// import Raphael from 'raphael/raphael'
// global.Raphael = Raphael


Vue.component('activity-graph', ActivityGraph)


Vue.use(Router);

export default new Router({
  routes: [
     { path: '/', redirect: '/dashboard' },
    {
      path: '/dashboard',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/educationgraph',
      name: 'Education-Graph',
      component: EducationGraph,
    },
    {
      path: '/policy/new',
      name: 'newpolicyform',
      component: newpolicyform,
    },
    {
      path: '/employment/simple',
      name: 'simplequeryemployment',
      component: simplequeryemployment,
    },
    {
      path: '/maps',
      name: 'Maps',
      component: Maps,
    }
  ],
});
