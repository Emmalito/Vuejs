import Vue from 'vue'
import Router from 'vue-router'
import Game from '@/components/Game'
import Score from '@/components/Score'
import User from '@/components/User'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      components: {
        game: Game,
        score: Score,
        user: User
      }
    },
    {
      path: '/game',
      component: Home
    }
  ]
})
