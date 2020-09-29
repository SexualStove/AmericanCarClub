<template>
  <!-- Site footer -->
  <footer class="site-footer" style="position: relative; box-shadow: rgba(0,0,0,0.5) 5px 5px inset">
    <div id="Stars2" >
      <div id="LeftSide" style="position: absolute; top: 0; transform: translateY(-2vh) scale(0.9)">
        <i class="star"></i>
        <i class="star"></i>
        <i class="star"></i>
      </div>
      <div id="RightSide" style="position: absolute; top: 0; transform: translateY(-2vh) scale(0.9); right: 0;">
        <i class="star"></i>
        <i class="star"></i>
        <i class="star"></i>
      </div>
    </div>
    <div class="container">
      <h3 id="FooterNav">
        <a style="color: goldenrod;" class="FN" id="AboutUs2" > About Us </a>
        <span>&#8226;</span>
        <a style="color: goldenrod;" class="FN" id="ContactUs2" > Contact Us </a>
        <span>&#8226;</span>
        <a style="color: goldenrod;" class="FN" id="Gallery2"> Gallery </a>
      </h3>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-sm-6 col-xs-12">
          <p class="copyright-text">Copyright &copy; 2020 All Rights Reserved by
            <a href="#">In House Web</a>.
          </p>
        </div>

      </div>
    </div>
  </footer>
</template>

<script>
    import JQuery from 'jquery';
    let $ = JQuery;
    import {EventBus} from "../../App";
    export default {
        name: "HomeFooter",
        methods: {
            async ChangeService(Int) {
                this.$cookie.set('Service', Int, {expires: '10m'});
                EventBus.$emit('Service', Int);
            }
        },
        mounted() {
            $('#AboutUs2').click(function () {
                EventBus.$emit('Page', 1);
                // this.ServiceClick();
            });
            $('#ContactUs2').click(function () {
                EventBus.$emit('Page', 2);
                //this.ServiceClick();
            });
            $('#Gallery2').click(function () {
                EventBus.$emit('Page', 4);
                //this.ServiceClick();
            });
        }
    }
</script>

<style scoped>
  .FN:hover {
    cursor: pointer;
  }
  #FooterNav {
    color: goldenrod;
  }
  .site-footer
  {

    background-color: #002868;
    background-size: 15%;
    box-shadow: rgba(0, 0, 0, 0.7) 0px 8px 6px -6px ;
    padding:10px 0 20px;
    font-size:18px;
    line-height:24px;
    color:#737373;
  }
  .site-footer hr
  {
    border-top-color:#bbb;
    opacity:0.5
  }
  .site-footer hr.small
  {
    margin:20px 0
  }
  .site-footer h6
  {
    color:#000;
    font-size:16px;
    text-transform:uppercase;
    margin-top:5px;
    letter-spacing:2px
  }
  .site-footer a
  {
    color:#737373;
  }
  .site-footer a:hover
  {
    color:#3366cc;
    text-decoration:none;
  }
  .footer-links
  {
    padding-left:0;
    list-style:none
  }
  .footer-links li
  {
    display:block
  }
  .footer-links a
  {
    color:#737373
  }
  .footer-links a:active,.footer-links a:focus,.footer-links a:hover
  {
    color:#3366cc;
    text-decoration:none;
  }
  .footer-links.inline li
  {
    display:inline-block
  }
  .site-footer .social-icons
  {
    text-align:right
  }
  .site-footer .social-icons a
  {
    width:40px;
    height:40px;
    line-height:40px;
    margin-left:6px;
    margin-right:0;
    border-radius:100%;
    background-color:#33353d
  }
  .copyright-text
  {
    margin:0
  }
  @media (max-width:991px)
  {
    .site-footer [class^=col-]
    {
      margin-bottom:30px
    }
  }
  @media (max-width:767px)
  {
    .site-footer
    {
      padding-bottom:0
    }
    .site-footer .copyright-text,.site-footer .social-icons
    {
      text-align:center
    }
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

  @media (max-width:767px)
  {
    li {
      margin-top: 5px;
    }
  }
</style>
