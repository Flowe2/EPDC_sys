<template>
  <userLogin></userLogin>
</template>

<script>
import userLogin from './components/userLogin.vue'

export default {
  name: 'App',
  components: {
    userLogin
  }
}
</script>

<style>
#app {
  width: auto;
  height: autoA;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
