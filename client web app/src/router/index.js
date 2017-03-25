import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import EducationGraph from '@/components/EducationGraph';
import Map from '@/components/map';
import newpolicyform from '@/components/newpolicyform';

Vue.use(Router);

export default new Router({
  routes: [
    // { path: '/', redirect: '/dashboard' },
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
      path: '/map',
      name: 'map',
      component: Map,
    }
    ,
    {
      path: '/policy/new',
      name: 'newpolicyform',
      component: newpolicyform,
    }
  ],
});
