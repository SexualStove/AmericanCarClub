<template>
  <div>
    <div style="" id="toggle-Button" class="toggle.btn">

    </div>

    <div class="menu">
      <div class="data">
        <ul>
          <li id="ItemOne">
            Navigation
          </li>
          <li id="ItemTwo">
            Home
          </li>
          <li id="ItemThree">
            About Us
          </li>
          <li id="ItemFour">
            Portfolio
          </li>
          <li id="ItemFive">
            Contact Us
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    import JQuery from 'jquery';
    let $ = JQuery;
    import {TimelineMax, Expo } from "gsap"
    export default {
        data() {
            return {
                Reverse: true,
                FirstTime: false,
            }
        },
        methods: {

        },
        mounted() {
          var NavBarTimeline = new TimelineMax({paused: true});


          $('#toggle-Button').click( function () {
              if(this.Reverse) {
                  NavBarTimeline.reverse();
              } else {
                  if(!this.FirstTime) {
                      NavBarTimeline.to(".menu", 2, {top: 0, ease: Expo.easeInOut, delay: -1.5});
                      NavBarTimeline.from("#ItemOne", 0.4, {x: -200, opacity: 0});
                      NavBarTimeline.from("#ItemTwo", 0.4, {x: -200, opacity: 0}, '-=0.25');
                      NavBarTimeline.from("#ItemThree", 0.4, {x: -200, opacity: 0}, '-=0.25');
                      NavBarTimeline.from("#ItemFour", 0.4, {x: -200, opacity: 0}, '-=0.25');
                      NavBarTimeline.from("#ItemFive", 0.4, {x: -200, opacity: 0}, '-=0.25');
                      this.FirstTime = true;
                  }
                  NavBarTimeline.play();
              }
              this.Reverse = !this.Reverse;
          });

        }
    }
</script>

<style scoped>
  .menu{
    position: absolute;
    background-color: #261D4F;
    width: 100%;
    height: 100vh;
    line-height: 80px;
    z-index: 3;
    top: -100vh;
  }

  .data {
    padding: 13em 0 0 2em;
    text-align: left;
  }

  ul {
    list-style: none;
  }
  li:first-child {
    color: grey;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 30px;
  }
  li:not(:first-child) {
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    color: #FFFCF2;
    font-size: 52px;
  }

  #toggle-Button {
    position: absolute; width: 150px; height: 150px; z-index: 4;
  }
  #ItemOne, #ItemTwo, #ItemThree,#ItemFour, #ItemFive {
    opacity: 1;
  }
</style>