<template>
  <div id="AllGalleriesArea">
    <div v-if="CurrentGallery !== undefined">
      <Gallery :myUrl="myUrl" :GalleryVue="CurrentGallery" :LoadTable="true"></Gallery>
    </div>
    <div v-if="CurrentGallery === undefined">
      <div id="Title">
        Car Gallery
      </div>
      <div id="CarLine"></div>
      <div id="CarDesc">
        Our collection of images from the events hosted or sponsored by us, The American Classic Car Club.
      </div>
      <div style="min-height: 50vh">
      <div v-for="GalleryChunk in Galleries" :key="GalleryChunk.id">
        <transition name="BlogLoad" :key="GalleryChunk.id">
        <div class="section animate" style="transition: 1s" v-if="GalleryChunk.Type < TotalBlogSize">
          <div class="middle">
            <img v-on:click="ClickedGallery(GalleryChunk)" :src="myUrl+'/uploads/Thumbnails/'+GalleryChunk.Location" :alt="myUrl+'/Thumbnails/'+GalleryChunk.Location">
          </div>
          <div class="left title">
            <div class="content">
              <h2 style="font-size: 2vw">{{GalleryChunk.Title}}</h2>
              <p>{{GalleryChunk.Description}}</p>
              <a href="#" class="btn-primary" v-on:click="ClickedGallery(GalleryChunk)">View Gallery</a>
            </div>
          </div>
          <div class="right tiles">
            <img :src="myUrl+'/uploads/Thumbnails/'+GalleryChunk.Location" :alt="myUrl+'/Thumbnails/'+GalleryChunk.Location">
            <img :src="myUrl+'/uploads/Thumbnails/'+GalleryChunk.Location" :alt="myUrl+'/Thumbnails/'+GalleryChunk.Location">
            <img :src="myUrl+'/uploads/Thumbnails/'+GalleryChunk.Location" :alt="myUrl+'/Thumbnails/'+GalleryChunk.Location">
            <img :src="myUrl+'/uploads/Thumbnails/'+GalleryChunk.Location" :alt="myUrl+'/Thumbnails/'+GalleryChunk.Location">
          </div>
        </div>

        </transition>
      </div>
      </div>
    </div>


  </div>
</template>

<script>

  //getThumbnail(GalleryChunk.Location)
  //require(`../../../server/uploads/Thumbnails/${GalleryChunk.Location}`)
  //require('../../../server/uploads/Thumbnails/69512089_3032995033381543_1415671549188374528_o.jpg1599021318104.jpeg')
    import BlogController from '@/services/BlogServices';
    import Gallery from './GalleryModern'
    import {BaseURL} from '@/services/api';
    import {EventBus} from "../../App";
    import JQuery from 'jquery';
    let $ = JQuery;

  $(document).ready(function () {
      var $sm = 768;
      //var $md = 768;

      function resizeThis() {
          let $imgH = $(".middle img").width();
          if ($(window).width() >= $sm) {
              $(".left,.right,.section").css("height", $imgH);
          } else {
              $(".left,.right,.section").css("height", "auto");
          }
      }

      //resizeThis();

      $(window).resize(function () {
          resizeThis();
      });

      $(window).scroll(function () {
              let $imgH = $(".middle img").height();
              console.log($imgH);
              $(".section, .middle, .left").css("height", $imgH);

          $(".section").each(function () {
              var $elementPos = $(this).offset().top;
              var $scrollPos = $(window).scrollTop();

              var $sectionH = $(this).height();
              var $h = $(window).height();
              var $sectionVert = $h / 2 - $sectionH / 4;

              if (
                  $elementPos - $sectionVert -200  <= $scrollPos &&
                  $elementPos - $sectionVert -100 + $sectionH > $scrollPos
              ) {
                  $(this).addClass("animate");
              } else {
                  $(this).removeClass("animate");
              }
          });
      });


  });

  $(function () {
      $('a[href*="#"]:not([href="#"])').click(function () {
          if (
              location.pathname.replace(/^\//, "") ==
              this.pathname.replace(/^\//, "") &&
              location.hostname == this.hostname
          ) {
              var target = $(this.hash);
              target = target.length
                  ? target
                  : $("[name=" + this.hash.slice(1) + "]");
              if (target.length) {
                  $("html, body").animate(
                      {
                          scrollTop: target.offset().top
                      },
                      1000
                  );
                  return false;
              }
          }
      });
  });




  export default {
        components: {Gallery},
        data() {

            return {

                myUrl: BaseURL,
                blogContent:"",
                blogs: '',
                thumbnail: '',
                TotalBlogSize: 3,
                Galleries: undefined,
                CurrentGallery: undefined,
                TransferBlogList: undefined,
                Reversed: false,
                ImageTable: undefined,
            }
        },

        methods: {

            getThumbnail(pet) {
                var IMG = require.context('../../../server/uploads/Thumbnails', false, /\.jpeg$/);
                console.log(pet);
                console.log(IMG);
                return IMG('./'+pet+'.jpeg');
            },

            ClickedGallery(GalleryChunk) {
                //console.log(GalleryChunk);
                EventBus.$emit('Gallery', GalleryChunk);
                EventBus.$emit('ImageTable', this.ImageTable);
                this.CurrentGallery = GalleryChunk;
                $('html, body').animate({
                    scrollTop: $('#Divider').offset().top + 200
                }, 500);
            },

            async getGalleries() {
                try {

                    const blogs = await BlogController.getAllGallery();
                    //const images = await BlogController.getImageTables();
                    //console.log(blogs.data.Galleries);

                    //this.ImageTable = images.data.Galleries;
                    //console.log(this.ImageTable);
                    this.blogs = blogs.data.Galleries;
                    //this.ReRollBlogs();
                    this.ReRollBlogs();

                    // this.blogContent = blogData.data.blog.Content;
                    // document.getElementById('blog').innerHTML = this.blogContent
                } catch (e) {
                    console.log(e);
                    this.myUrl = e;
                }
            },

            async ReRollBlogs() {

                this.Galleries = this.blogs.slice();
                this.SortNewBlogs();
                //this.SortNewBlogs();
            },

            async SortNewBlogs() {
                //console.log("Was this triggered?");
                this.Galleries = this.blogs.slice();
                let BlogLength = this.Galleries.length;
                let SearchText = "";
                if(this.Reversed) {
                    this.Galleries = this.Galleries.reverse();
                }
                this.Reversed = !this.Reversed;
                let FilterList = [];
                let i = 0;
                for(i=0; i < BlogLength; i++) {
                    //console.log(this.Galleries[i].Location)
                    if(this.Galleries[i].Title.toLowerCase().includes(SearchText.toLowerCase())) {
                        FilterList.push(this.Galleries[i]);

                    }
                }

                this.Galleries = FilterList.slice();
                for(i=0; i < this.Galleries.length; i++) {
                    this.Galleries[i]["Type"] = i;
                }
                //console.log("Added new chunk to list");
                //console.log(FilterList);
                this.TotalBlogSize = 2;
            }
        },
        beforeMount() {
            this.getGalleries();
            this.SortNewBlogs();
            //this.SortNewBlogs();
            $(".section, .middle, .left").css("height", 500);
        },

        computed: {

        },
        mounted() {

           /* $(window).scroll(function () {

                if($(".middle img").height() !== 0) {
                    let $imgH = $(".middle img").height();
                    console.log($imgH)
                    $(".section, .middle, .left").css("height", $imgH);
                }
            });*/


            var self = this;
            EventBus.$on('CurrentGallery', changed => {
                self.CurrentGallery = changed;
                //console.log(`Oh, that's nice. It's gotten ${self.CurrentGallery} clicks! :)`);
            });

            this.$nextTick(function(){
                window.addEventListener("scroll", function() {

                    self.Scrolled = document.documentElement.scrollTop;
                    if ($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
                        if(self.TotalBlogSize < self.blogs.length) {
                            self.TotalBlogSize += 1;
                        }
                    }
                })
            })



        }
    }
</script>

<style scoped>

  @import url(https://fonts.googleapis.com/css?family=Roboto:300,900);
  #AllGalleriesArea {
    background-image: url("../../assets/images/BackgroundB.png");
    background-size: 20%;
    font-family: 'Roboto', sans-serif;
  }

  .content {
    height: 100%;
  }
  .header a, .footer a {
    color: #fff;
  }
  @media (min-width: 768px) {
    .header, .footer {
      padding: 100px 30px;
    }
  }
  .header h1, .footer h1 {
    font-size: 4em;
    font-weight: 300;
  }
  .header i.fa, .footer i.fa {
    font-size: 4em;
  }
  .header .bounce, .footer .bounce {
    -webkit-animation-name: bounce;
    animation-name: bounce;
    -webkit-transform-origin: center bottom;
    transform-origin: center bottom;
    animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
  }
  .header .animated, .footer .animated {
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  #Title {
    color: white;
    font-family: 'Cinzel', serif;
    font-size: 6vw;
    text-align: center;
    padding-top: 5%;
    font-weight: 600;
    //padding-bottom: 2%;
  }
  #CarLine {
    margin-left: 25%;
    width: 50%;
    height: 2px;
    background-color: whitesmoke;
  }
  #CarDesc {
    color: white;
    font-size: 1.3vw;
    margin: 2%;
  }
  .section {
    width: 100%;
    position: relative;
    //height: 25vw;
    //margin: 50px 0;
    background-color: rgba(0,0,0, 0.2);
    border-radius: 30px;;
    //box-shadow: inset 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .section .left, .section .middle, .section .right {
    width: 100%;
    display: block;
    color: #fff;
    box-sizing: border-box;
    left: 0;
    padding: 30px;
    text-align: center;
    overflow: hidden;
    -moz-transition: 0.3s ease-in-out all;
    -o-transition: 0.3s ease-in-out all;
    -webkit-transition: 0.3s ease-in-out all;
    transition: 0.3s ease-in-out all;
  }
  @media (min-width: 480px) {
    .section .left .content, .section .middle .content, .section .right .content {
      position: relative;
      //height: 33.33%;
    }
  }
  @media (min-width: 480px) {
    .section .left, .section .middle, .section .right {
      width: 50%;
      font-size: 0.9em;
      padding: 10px;
      left: 0;
      float: left;
      position: absolute;
      //height: auto;
    }
  }
  @media (min-width: 768px) {
    .section .left, .section .middle, .section .right {
      width: 33.33333%;
      left: 33.33%;
      padding: 10px;
    }
  }
  @media (min-width: 992px) {
    .section .left, .section .middle, .section .right {
      padding: 30px;
      font-size: 1em;
    }
    .left {
      height: 100%;
    }
  }
  .section.animate .left {
    left: 0;
  }
  @media (min-width: 480px) {
    .section.animate .left {
      left: 50%;
    }
  }
  @media (min-width: 768px) {
    .section.animate .left {
      left: 0;
    }
  }
  .section.animate .right {
    left: 0;
  }
  @media (min-width: 480px) {
    .section.animate .right {
      left: 50%;
    }
  }
  @media (min-width: 768px) {
    .section.animate .right {
      left: 66.66%;
    }
  }
  .section .title {
    background: tomato;
  }
  .section .title h2 {
    margin-top: 0;
  }
  .section .title p {
    line-height: 1.55em;
    margin-bottom: 0.75em;
  }
  .section .title .btn-primary {
    color: #fff;
    background: #ff3814;
    padding: 10px;
    text-decoration: none;
    border-radius: 3px;
    display: inline-block;
    -moz-transition: 0.3s ease-in-out all;
    -o-transition: 0.3s ease-in-out all;
    -webkit-transition: 0.3s ease-in-out all;
    transition: 0.3s ease-in-out all;
  }
  .section .title .btn-primary:hover {
    background: #fa2600;
  }
  .section .tiles {
    padding: 0;
    background: #fff;
    clear: both;
    display: none;
    float: none;
  }
  .section .tiles img {
    width: 50%;
    float: left;
    height: auto;
    opacity: 0.7;
    -moz-transition: 0.3s ease-in-out all;
    -o-transition: 0.3s ease-in-out all;
    -webkit-transition: 0.3s ease-in-out all;
    transition: 0.3s ease-in-out all;
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -o-filter: grayscale(100%);
  }
  .section .tiles img:hover {
    opacity: 1;
    -webkit-filter: grayscale(0%);
    -moz-filter: grayscale(0%);
    -o-filter: grayscale(0%);
  }
  @media (min-width: 768px) {
    .section .tiles {
      display: block;
    }
  }
  .section .middle {
    background: slategray;
    z-index: 2;
    padding: 0;
  }
  .section .middle img {
    width: 100%;
    height: auto;
    display: block;
  }

  @-webkit-keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      -webkit-transform: translateY(0);
    }
    40% {
      -webkit-transform: translateY(-20px);
    }
    60% {
      -webkit-transform: translateY(-10px);
    }
  }
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }


</style>