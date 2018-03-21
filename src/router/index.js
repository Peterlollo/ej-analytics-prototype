import Vue from 'vue'
import Router from 'vue-router'
import Data from '@/components/Data'
import MoreData from '@/components/MoreData'
import Providers from '@/components/Providers'
import NotFoundComponent from '@/components/NotFoundComponent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        main: Data,
        sidebar: Providers
      }
    },
    {
      path: '/fetchMoreData',
      name: 'fetchMoreData',
      components: {
        main: MoreData,
        sidebar: Providers
      }
    },
    {
      path: '*',
      name: 'notFound',
      components: {
        main: NotFoundComponent
      }
    }
  ]
})
