<template>
  <div id="app" :style="{'background-color': computedColorFromStore}">
    <div id="nav">
      <router-link to="/">Home</router-link> <span class="divider"> | </span>
      <router-link to="/about">About</router-link> <span class="divider"> | </span>
      <router-link to="/reaction" >Reaction</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      bgcol: "white"
    };
  },
  methods: {
    changeBg(bg) {
      this.bgcol = bg;
    }
  },
  computed: {
    changeBgComputed() {
      return this.bgcol;
    },
    computedColorFromStore(){
      return this.$store.state.currentColor;
    }
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a, .divider{
  color:white;
}
a:hover{
  color:black;
  text-decoration: none;
}
html{
  height: 100vh;
}
</style>

