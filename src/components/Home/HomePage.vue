<template>
  <div >
    <home-page-splash-screen ></home-page-splash-screen>
    <transition name="slide-fade-right" v-bind:key="CurrentPage">
      <img v-if="CurrentPage > 0" id="Divider" src="../../assets/images/TitleDivider.png" alt="None">
    </transition>
    <div id="Content">
      <transition name="slide-fade-right" v-bind:key="CurrentPage">
        <AboutUs v-if="CurrentPage === 1" style="margin-top: 5.5%"></AboutUs>
      </transition>
      <transition name="slide-fade-right" v-bind:key="CurrentPage">
        <ContactUs v-if="CurrentPage === 2" style="margin-top: 6%"></ContactUs>
      </transition>
      <transition name="slide-fade-right" v-bind:key="CurrentPage">
        <Events v-if="CurrentPage === 3" style="margin-top: 6%"></Events>
      </transition>
      <transition name="slide-fade-right" v-bind:key="CurrentPage">
        <AllGalleries v-if="CurrentPage === 4"  style="margin-top: 6%"></AllGalleries>
      </transition>
    </div>

  </div>
</template>

<script>
    import HomePageSplashScreen from "./HomePageSplashScreen";
    import AboutUs from "../About/AboutUs";
    import AllGalleries from '../Gallery/AllGalleries'
    import ContactUs from "../ContactUs/ContactUsForm";
    //import EventsPage from "../Events/EventsPage";
    import {EventBus} from "../../App";


    import Events from "../Events/Events";
    import JQuery from 'jquery';
    let $ = JQuery;
    //style="background: linear-gradient(to left,#A4B0F5, #FFFCF2); width: 100vw"
    export default {
        name: "HomePage",
        components: {Events, AboutUs, HomePageSplashScreen, AllGalleries, ContactUs},
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
  transform: translate(-49.65vw, 0);
  overflow-x: hidden;
  max-width: 100%;
  background-color: #30011E;
  z-index: -1;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>