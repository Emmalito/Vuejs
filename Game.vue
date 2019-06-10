<template>
  <div class="content">
    <div class='game' v-on:click="clickOnInterface" :class="{wait: !user || stopped}">
      <span class="time" v-if="!stopped"> {{ time }} </span>
      <span class="round" v-if="user && !stopped" :style="roundStyle" :class="{bonus : bonusActivated, badColor : badColorActivated}" v-on:click.stop="clickOnRound" v-on:click.alt.stop="bonus"></span>
    </div>
    <div class="log">
      <p v-for="item in userLog" :key="item.id"> #{{ item.nbClick }} - {{ item.message }} </p> <!-- v-if="item.type === 'user' -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'game',
  props: ['user'],
  /*
  template: `
  <div class='game'>
    Espace de jeugo.
  </div>
  `
  */
  data () {
    return {
      click: 0,
      time: 0,
      roundStyle: {
        width: '50px',
        height: '50px',
        margin: '20% 20%'
      },
      bonusActivated: false,
      badColorActivated: false,
      collection: [],
      Id: 0,
      stopped: true
    }
  },
  computed: {
    userLog () {
      return this.collection.filter(function (item) {
        return item.type === 'user'
      })
    }
  },
  created: function () {
    document.onkeydown = this.start
  },
  watch: {
    click () {
      this.updatedRound()
      this.$emit('score', this.click)
    },
    user () {
      this.stopped = false
      this.time = 10

      let self = this
      setInterval(function () {
        self.updateTime()
      }, 1000)
    }
  },
  methods: {
    updateTime () {
      if (this.time === 0) {
        this.stopped = true
      }
      if (!this.stopped) {
        this.time--
      }
    },
    clickOnRound (event) {
      if (!this.user) {
        return
      }
      setTimeout(this.updatedRound, 500)
      this.updateClick(true)
      this.Id++
      this.addLog(`BRAVO ! `)
    },
    bonus (event) {
      if (this.bonusActivated) {
        this.updateClick(true)
        this.addLog(`PERFECT ! + 2`)
      } else {
        this.updateClick()
        this.addLog(`??????? ! -1`)
      }
    },
    clickOnInterface (event) {
      if (!this.user || this.stopped) {
        return
      }
      this.updateClick()
      this.Id++
      this.addLog(`OH NON ! -1`)
    },
    updateClick (increment) {
      if (!this.user || this.stopped) {
        return
      }

      if (increment) {
        this.click++
      } else {
        this.click--
      }
    },
    start (event) {
      // console.log(event)
    },
    updatedRound () {
      let size = Math.random() * (100 - 10) + 10
      let top = Math.random() * (40 - 5) + 5
      let left = Math.random() * (80 - 5) + 5

      this.bonusActivated = size > 80
      this.badColorActivated = size < 20

      this.addLog({
        size: size,
        top: top,
        left: left
      }, 'round')

      this.roundStyle.height = this.roundStyle.width = `${size}px`
      this.roundStyle.margin = `${top}% ${left}%`
    },
    addLog (message, type) {
      if (!this.user || this.stopped) {
        return
      }
      let typeOfMessage = type || 'user'
      this.collection.unshift({nbClick: this.Id, message: message, type: typeOfMessage})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  height: 500px;
  /* margin-bottom: 2em; */
}
.log {
  width: 100%;
  height: 30px;
  background: #666;
  text-align: center;
  color: azure;
  display: block;
  overflow: hidden;
  padding: 6px;
}
.game {
  width: 100%;
  height: 90%;
  display: block;
  background: black;
  opacity: 1;
  transition: opacity 1s;
}
.round {
  /* height: 50px;
  width: 50px; */
  background: aliceblue;
  border-radius: 9999px;
  position: absolute;
  transition: width 2s, height 2s, margin 0.5s;
  /* margin: 20% 20%; */
}
.bonus {
  background: red;
}
.badColor {
  background: #2a2b2b;
}
.wait {
  opacity: 0.3;
}
.time {
  position: absolute;
  font-size: 90pt;
  padding-left: 30px;
  color: darkgoldenrod;
  opacity: 0.2;
}
</style>
