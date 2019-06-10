<template>
  <div class='score' v-if="user">
    <!-- {{ score 'Votre score : ' + score : 'Appuyez sur Entrée pour démarrer.' }} -->
    {{ score }}
  </div>
</template>

<script>
export default {
  name: 'score',
  /* created () {
    this.point = this.score ? 'Votre Score : ' + this.point : 'Votre score est nul.'
  } */
  props: ['score', 'user']
}
</script>

<style scoped>
.score {
  display: block;
  height: 50px;
  width: 150px;
  font-size: 12pt;
  background: #666;
  color: greenyellow;
  padding: 5px;
  line-height: 40px;
  margin: 0 auto;
}
</style>
