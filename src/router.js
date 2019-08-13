import Vue from 'vue'
import Router from 'vue-router'

import HomePage from './components/HomePage.vue'
import AboutPage from './components/AboutPage.vue'

Vue.use(Router)

export default new Router({
    routes: [
      {
        path: '/',
        name: 'home',
        component: HomePage
      },
      {
        path: '/about',
        name: 'about',
        component: AboutPage
      }
    ]
  })