<template>
  <div id="app">
    <router-view name='game' v-on:score="updateScore" :user="user"/>
    <router-view name='user' class="text-center" v-on:user="updateUser"/>
    <router-view name='score' class="text-center" :score="score" :user="user"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {score: 0, user: false}
  },
  methods: {
    updateScore: function (score) {
      this.score = score
    },
    updateUser: function () {
      this.user = true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 500px;
  display: block;
}
</style>
