<template>
  <div id="SplashZone">

    <div id="BlueStripe">
      <div id="stars">
        <div style="display: inline-block" v-for="i in 16" :key="i">
          <i class="star"></i>
          <div style="height: 5vh" v-if="i === 8"></div>
        </div>



      </div>
      <h1 id="LogoTop">
        American Classics Car Club
      </h1>
      <div id="Line"></div>

      <div>
      <h3 id="NavArea">
        <a id="AboutUs" class="NavItem"> About Us </a>
        <span>&#8226;</span>
        <a id="ContactUs" class="NavItem"> Contact Us </a>
        <span>&#8226;</span>
        <a id="Events" class="NavItem"> Events </a>
        <span>&#8226;</span>
        <a id="Gallery" class="NavItem"> Gallery </a>
      </h3>
      </div>
    </div>
    <div id="Stripes">
      <div id="S1" class="RedStripe"></div>
      <div id="S2"  class="WhiteStripe"></div>
      <div id="S3"  class="RedStripe"></div>
      <div id="S4"  class="WhiteStripe"></div>
      <div id="S5"  class="RedStripe"></div>
      <div id="S6"  class="WhiteStripe"></div>
    </div>
  </div>
</template>

<script>
    import JQuery from 'jquery';
    let $ = JQuery;
    import {EventBus} from "../../App";
    import {  TimelineMax, Back } from "gsap"
    export default {
        methods: {
            ServiceClick() {
                $('html, body').animate({
                    scrollTop: $('#Content').offset().top -400
                }, 2000);
            }
        },
        mounted() {
            $('#AboutUs').click(function() {
                EventBus.$emit('Page', 1);
               // this.ServiceClick();
            });
            $('#ContactUs').click(function() {
                EventBus.$emit('Page', 2);
                //this.ServiceClick();
            });
            $('#Events').click(function() {
                EventBus.$emit('Page', 3);
                //this.ServiceClick();
            });
            $('#Gallery').click(function() {
                EventBus.$emit('Page', 4);
                //this.ServiceClick();
            });

            var LogoStringTimeline = new TimelineMax({});
            LogoStringTimeline.to("#BlueStripe", 2, {width: '50vw', ease: Back.easeOut.config(0.2)}).to(
                '#S1',  0.75, {width: '50vw'}).to('#S3',  0.75, {width: '50vw'}, '-=0.4').to(
                    '#S5',  0.75, {width: '50vw'}, '-=0.4').to('#S2',  0.75, {width: '50vw'}, '-=0.4').to(
                        '#S4',  0.75, {width: '50vw'}, '-=0.4').to('#S6',  0.75, {width: '50vw'}, '-=0.4').to(
                            '#LogoTop', 0.75, {y:'34vh', opacity: 1}).from("#Line", 0.5, { scaleX: 0, transformOrigin: "right center" }
                            ).from('#NavArea', 0.75, {y:500, opacity: 0, ease: Back.easeOut.config(1.2)});



        }
    }
</script>
<style>
  #S2 {
    background-image: url("../../assets/images/classiccar.jpg");
  }
  #S4 {
    background-image: url("../../assets/images/classiccar2.jpg");
  }
  #S6 {
    background-image: url("../../assets/images/slide1.jpg");
  }
  #Line {
    height: 1px;
    width: 80%;
    background-color: goldenrod;
    transform: translateY(34vh);
    margin-left: 10%;
    justify-self: center;
  }

  #LogoTop {
    font-family: 'Cinzel', serif;
    color: goldenrod;
    font-size: 3vw;
    opacity: 0;
  }

  #SplashZone {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
  }

  .RedStripe {
    background-color: #BF0A30;
    width: 0vw;
    height: 16.66%;
  }
  .WhiteStripe {
    background-color: #FFFFFF;
    width: 0vw;
    height: 16.66%;
  }
  #BlueStripe {
    justify-content: center;
    background-color: #002868;
    width: 0vw;
    height: 100%;
  }
  #NavArea {
    color: goldenrod;
    transform: translateY(34vh);
    font-size: 1.5vw;
    font-weight: 300;

    font-family: 'Roboto', sans-serif;
  }
  .NavItem:hover {
    cursor: pointer;
  }

  .star {
    position: relative;
    display: inline-block;
    width: 0;
    height: 0;
    margin: 5vw 5vw 5vw 5vw;
    border-right: 0.3em solid transparent;
    border-bottom: 0.7em solid white;
    border-left: 0.3em solid transparent;
    /* Controlls the size of the stars. */
    font-size: 3vw;
    opacity: 0.9;
    transform: translateY(-4vw);
  }
  .star:before, .star:after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    top: 0.6em;
    left: -1em;
    border-right: 1em solid transparent;
    border-bottom: 0.7em solid white;
    border-left: 1em solid transparent;
    transform: rotate(-35deg);
  }
  .star:after {
    transform: rotate(35deg);
  }

  #stars {
    position: absolute;
    width: 50%;
    height: 100vh;
    overflow: hidden;
  }
</style>