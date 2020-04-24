<template>
  <div id="WholePage">
    <HomePageSplashScreen></HomePageSplashScreen>
    <About></About>
  </div>
</template>

<script>
    import HomePageSplashScreen from "./HomePageSplashScreen";
    import About from "./About";
    export default {
        components: {About, HomePageSplashScreen}
    }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Amatic+SC&display=swap');
#WholePage {
  width: 100vw;
}

</style>