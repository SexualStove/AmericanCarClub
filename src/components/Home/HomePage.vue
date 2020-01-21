<template>
  <div >
    <home-page-splash-screen ></home-page-splash-screen>
    <transition name="slide-fade-right" v-bind:key="CurrentPage">
      <img v-if="CurrentPage > 0" id="Divider" src="../../assets/images/TitleDivider.png" alt="None">
    </transition>
    <div id="Content">
      <transition name="slide-fade-right" v-bind:key="CurrentPage">
        <AboutUs v-if="CurrentPage === 1" style="margin-top: 14%"></AboutUs>
      </transition>
      <transition name="slide-fade-right" v-bind:key="CurrentPage">
        <Events v-if="CurrentPage === 3" style="margin-top: 14%"></Events>
      </transition>
    </div>

  </div>
</template>

<script>
    import HomePageSplashScreen from "./HomePageSplashScreen";
    import AboutUs from "../About/AboutUs";
    //import EventsPage from "../Events/EventsPage";
    import {EventBus} from "../../App";

    import JQuery from 'jquery';
    import Events from "../Events/Events";
    let $ = JQuery;
    //style="background: linear-gradient(to left,#A4B0F5, #FFFCF2); width: 100vw"
    export default {
        name: "HomePage",
        components: {Events, AboutUs, HomePageSplashScreen},
        data() {
            return {
                CurrentPage: 0,
            }
        },
        methods: {
            ServiceClick() {
                $('html, body').animate({
                    scrollTop: $('#Content').offset().top
                }, 2000);
            }
        },
        mounted() {
            let self = this;
            EventBus.$on('Page', changed => {

                self.CurrentPage = changed;
                console.log(`Oh, that's nice. It's gotten ${self.CurrentPage} clicks! :)`);
                this.ServiceClick();
            });
        }
    }
    //"
</script>

<style scoped>
#Divider {
  position: absolute;
  width: 100vw;
  transform: translate(-49.65vw, -11.8vh);
  overflow-x: hidden;
  max-width: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>