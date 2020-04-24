<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';


export const EventBus = new Vue();
export default {
  name: 'app',
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Cinzel|Roboto&display=swap');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  max-width: 100%;
  width: 100%;

  overflow: hidden;
}
  body {
    margin: 0;
  }
</style>
