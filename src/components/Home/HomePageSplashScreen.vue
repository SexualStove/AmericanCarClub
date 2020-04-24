<template>
  <div id="Capsule">
    <div id="CenterWindow">
      <div id="Nav-content">
        <div id="Title"> Shirley Takeaways </div>
        <div id="navOptions">
          <div class="Option">About</div>
          <div class="Option">Menu</div>
          <div class="Option">Order Online</div>
        </div>
      </div>
      <div id="SplashPage">
        <div id="MainTitle"> Fish and Chips </div>
      </div>
    </div>

  </div>
</template>

<script>

</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Amatic+SC&display=swap');
  #Capsule, #CenterWindow {
    width: 100vw;
    height: 100vh;
  }
  #CenterWindow {
    width: 100vw;
    display: grid;
    grid-template-rows: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
    grid-template-areas:
      "Nav"
      "Main"
      "Main"
      "Main"
      "Main"
      "Main"
      "Main"
      "Main"
      "Main"
      "Main";
    justify-content: center;
  }
  #Nav-content {
    grid-area: Nav;
    width: 100vw;
    background-color: lightblue;
  }
  #SplashPage {
    grid-area: Main;
    background-image: url("../../assets/images/FishnChipMain.jpg");
    background-size: cover ;
    background-position: 0 -20vh;
    justify-content: center;
    display: inline-block;
  }
  #MainTitle {
    position: absolute;
    justify-self: center;
    font-family: 'Amatic SC', cursive;
    font-size: 8vw;
    width: 100vw;
    top: 30%
  }
  #Nav-content {
    text-align: center;

    align-items: center;
    display: grid;
    grid-template-columns: 20% 40% 40%;
    grid-template-areas:
    "Title Options Options"
  }
  #Title {
    font-size: 4vw;
    font-weight: 600;
    font-family: 'Amatic SC', cursive;
    display: block;
    grid-area: Title;
  }
  #navOptions {
    grid-area: Options;
  }
  .Option {
    display: inline-block;
    height: 100%;
    margin-left: 10vw;
    margin-right: 10vw;
  }
</style>