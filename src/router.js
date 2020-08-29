import Vue from 'vue';
import Router from 'vue-router';
import Index from './pages/Index.vue';
import Afd from './pages/Afd.vue';
import Afn from './pages/Afn.vue';
import MainNavbar from './layout/MainNavbar.vue';
import MainFooter from './layout/MainFooter.vue';

Vue.use(Router);

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'afd',
      components: { default: Afd, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: '/afn',
      name: 'afn',
      components: { default: Afn, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
