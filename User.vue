<template>
  <!-- <div v-bind:class='playerClass'> -->
  <div>
    <span :class="{ hide: !user }">{{ welcomeMessage }}</span>
    <!-- <span v-html="htmlMessage" :class="{ hide: !user }"></span> -->
    <form @submit.prevent="setUser" :class="{ hide : user }">
      <!-- <input name='player' placeholder='Entrez votre pseudo' v-border:red/> -->
      <input name='player' placeholder='Entrez votre pseudo' />
      <button type='submit'>Jouer</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      user: '',
      playerClass: '',
      welcomeMessage: ''
      // htmlMessage: ''
    }
  },
  updated: function () {
    // console.log('Component created.')
    this.playerClass = this.user ? 'player' : 'playerForm'
    this.welcomeMessage = this.user ? 'Bonjour ' + this.user + ' !' : 'Pas de joueur.'
    // this.htmlMessage = `Voici comment on fait de l'HTML <span class='user'>${this.user}</span> !`
  }, /*
  directives: {
    border (el, binding) {
      el.style.borderColor = binding.arg
    },
    hide (el, binding, vnode) {
      let isForm = vnode.tag === 'form'
      let user = vnode.context.user
      if (isForm) {
        el.style.display = user ? 'none' : 'block'
      } else {
        el.style.display = user ? 'block' : 'none'
      }
    }
  }, */
  methods: {
    setUser (event) {
      let playerName = event.target[0].value
      if (!playerName) {
        window.alert('Merci de renseigner votre pseudo !')
        return
      }
      this.user = playerName
      this.$emit('user')
    }
  }
}
</script>

<style scoped>
.hide {
  display: none;
}
/* .player form{
    display: none;
}

.playerForm span{
    display: none;
} */
</style>
