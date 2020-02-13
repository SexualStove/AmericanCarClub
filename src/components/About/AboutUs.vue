<template>
  <div id="AboutUsPage">
    <img style="" src="../../assets/images/AboutUs.jpg.png" alt="None">
    <div id="Content">
      <div id="ContentWords">
        <h1 id="AboutUsTitle">
          American Classic Car Club (Canterbury) Inc
        </h1>
        <p id="AboutUsContent">
          The club was formed during the 1970’s. It continues to be a strong club of like-minded people of all ages, like-minded in that all of our members have a passion for American Classic Cars.
          <br>
          <br>
          Club members are owners of a very wide range of American Classic Cars ranging from the 1930’s to present day models. The cars range from those that are impeccably restored to those that are a work in progress.
          <br>
          <br>
          A Committee of up to eleven members, led by a Club President are elected by members of the club at the A.G.M. The Committee puts much effort in to organising interesting and varied events. Each month we organise a get together. These events range from car cruises to a picnic area or to a restaurant/ hotel. Some events involve answering questions along the way and prizes at the final destinations.
          <br>
          <br>
          We also visit car collections, car shows, support charity events and events which are of interest to club members.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
    //import JQuery from 'jquery';
    //let $ = JQuery;
    import {  TimelineMax, Back } from "gsap"
    export default {

        data() {
            return {
                AboutUsContent: false,
            }
        },
        methods: {

        },

        computed: {

        },
        mounted() {
            //let self = this;
            this.$nextTick(function(){
                window.addEventListener("scroll", function() {
                    console.log(document.documentElement.scrollTop);
                    if (document.documentElement.scrollTop >= 1500) {
                        this.AboutUsContent = true;
                        console.log(this.AboutUsContent)
                        var LogoStringTimeline = new TimelineMax({play: true});
                        LogoStringTimeline.to("#ContentWords", 3, {opacity: 1, scale: 1, ease: Back.easeOut.config(0.2)})
                    }
                })
            });
        }
    }
</script>

<style scoped>
  #AboutUsTitle {
    color: white;
      font-family: 'Cinzel', serif;
      font-size: 3.2vw;
    text-align: center;
    padding-top: 5%;
    padding-bottom: 2%;

  }

#AboutUsPage {
  padding-bottom: 2%;
  width: 100vw;
  text-align: left;
  background-color: #30011E;

}
  #AboutUsContent {
    font-size: 1.2vw;
    font-weight: 300;
    font-family: 'Roboto', sans-serif;
    color: white;
    margin: 0% 2% 10% 2%;
    text-align: center;
    opacity: 1;
  }

  #Content {
    margin: 5% 15% 10% 15%;
    padding: 1% 1% 2% 1%;
    background-color: rgba(0,0,0, 0.2);
    box-shadow: inset 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    display: block;
    position: relative;
    border-radius: 10%;
  }
  #ContentWords {
    opacity: 0;
    transform: scale(.5);
  }
  #Content:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: url("../../assets/images/AboutUsCar.png") ;
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; /* Resize the background image to cover the entire container */
    opacity: 0.11;
    z-index: 2;
  }
  .Thumbnail {
    width: 50vw;
  }
  .ImageGallery {
    display: inline-block;
    width: 10vw;
  }
  .GalleryImages {
    display: inline-block;
  }
</style>