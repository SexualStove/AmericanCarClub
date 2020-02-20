<template>
  <div id="GalleryPage">
    <div id="SearchOptions" v-if="CurrentGallery === undefined">
      <button v-on:click="SortNewBlogs" class="btn-shine">
        <span>Reverse Order</span>
      </button>
      <div class="search">
        <div>
          <input v-on:change="SortNewBlogs" style="display: inline-block" id="SearchBlog" type="text" placeholder="       Search . . ." required>
        </div>
      </div>
    </div>
    <div v-if="CurrentGallery !== undefined">
      <Gallery :GalleryVue="CurrentGallery" :image-table="ImageTable"></Gallery>
    </div>
    <div v-if="CurrentGallery === undefined">
      <div  v-on:click="ClickedGallery(GalleryChunk)" v-for="GalleryChunk in Galleries" :key="GalleryChunk.id">
        <transition name="BlogLoad" :key="GalleryChunk.id">
          <div style="transition: 1s" class="BlogPost" v-if="GalleryChunk.Type < TotalBlogSize">
            <div class="GalleryIcon">
              <h1 class="GalleryTitle">{{GalleryChunk.Title}}</h1>
              <img class="Thumbnail" v-bind:src="GalleryChunk.Image" alt="None">
            </div>
          </div>
        </transition>

      </div>
    </div>
  </div>
</template>

<script>
    import BlogController from '@/services/BlogServices'
    import Gallery from '../Gallery/Gallery'
    import {EventBus} from "../../App";
    import JQuery from 'jquery';
    let $ = JQuery;


    export default {
        components: {Gallery},
        data() {

            return {

                myUrl: 'asdfb',
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

            ClickedGallery(GalleryChunk) {
                console.log(GalleryChunk);
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
                    const images = await BlogController.getImageTables();
                    console.log(blogs.data.Galleries);

                    this.ImageTable = images.data.Galleries;
                    console.log(this.ImageTable);
                    this.blogs = blogs.data.Galleries;
                    this.ReRollBlogs();
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
                console.log("Was this triggered?");
                this.Galleries = this.blogs.slice();
                let BlogLength = this.Galleries.length;
                let SearchText = document.getElementById('SearchBlog').value;
                if(this.Reversed) {
                    this.Galleries = this.Galleries.reverse();
                }
                this.Reversed = !this.Reversed;
                let FilterList = [];
                let i = 0;
                for(i=0; i < BlogLength; i++) {
                    if(this.Galleries[i].Title.toLowerCase().includes(SearchText.toLowerCase())) {
                        FilterList.push(this.Galleries[i]);

                    }
                }

                this.Galleries = FilterList.slice();
                for(i=0; i < this.Galleries.length; i++) {
                    this.Galleries[i]["Type"] = i;
                }
                console.log("Added new chunk to list");
                console.log(FilterList);
                this.TotalBlogSize = 2;

            }
        },
        beforeMount() {
            this.getGalleries()
        },

        computed: {

        },
        mounted() {

            var self = this;
            EventBus.$on('CurrentGallery', changed => {
                self.CurrentGallery = changed;
                console.log(`Oh, that's nice. It's gotten ${self.CurrentGallery} clicks! :)`);
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
  .GalleryTitle {
    color: #D7CDCC;
    font-family: 'Cinzel', serif;
    font-size: 2.5vw;


  }

  #GalleryPage {
    width: 100vw;
    background-color: #30011E;
  }
  #AboutUsContent {
    font-size: 1.2vw;
    font-weight: 300;
    margin: 3% 10% 3% 1%;
    font-family: 'Roboto', sans-serif;
  }
  .Thumbnail {
    max-width: 50vw;
    box-shadow:
      -50px -50px 0 -40px tomato,
      50px 50px 0 -40px tomato;
    cursor: pointer;
  }
  .ImageGallery {
    display: inline-block;
    width: 50vw;
  }
  .GalleryImages {
    display: inline-block;
  }
  .GalleryIcon {
    padding: 4vw 0 4vw 0;

  }
  .BlogLoad-enter-active {
    transition: all 1s ease;
  }
  .BlogLoad-leave-active {
    transition: all .8s;
  }
  .BlogLoad-enter, .BlogLoad-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: scale(0.1);
    -ms-transform: scale(0.1);
    -webkit-transform: scale(0.1);
    opacity: 0;
  }














  .search {
    margin: 20px;
  }

  .search > h3 {
    font-weight: normal;
  }

  .search > h1,
  .search > h3 {
    color: white;
    margin-bottom: 15px;
    text-shadow: 0 1px #0091c2;
  }

  .search > div {
    display: inline-block;
    position: relative;
  }

  .search > div:after {
    content: "";
    background: #F8DFDD;
    width: 4px;
    height: 20px;
    position: absolute;
    top: 40px;
    right: 2px;
    transform: rotate(135deg);
    box-shadow: 1px 0 #0091c2;
  }

  .search > div > input {
    color: #F8DFDD;
    font-size: 16px;
    background: transparent;
    width: 25px;
    height: 25px;
    padding: 10px;
    border: solid 3px white;
    outline: none;
    border-radius: 35px;
    box-shadow: 0 1px #0091c2;
    transition: width 0.5s;
  }

  .search > div > input::placeholder {
    color: #F8DFDD;
    opacity: 1;
  }

  .search > div > input::-ms-placeholder {
    color: #F8DFDD;
  }

  .search > div > input::-ms-input-placeholder {
    color: #F8DFDD;
  }

  .search > div > input:focus,
  .search > div > input:valid {
    width: 250px;
  }


  button {
    position: relative;
    margin: 0;
    padding: 5px 12px;
    height: 60px;
    width: 150px;
    outline: none;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-transform: uppercase;
    background-color: #F8DFDD;
    border: 1px solid rgba(22, 76, 167, 0.6);
    border-radius: 10px;
    color: black;
    font-weight: 400;
    font-size: 20px;
    font-family: inherit;
    z-index: 0;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.02, 0.01, 0.47, 1);
  }
  button span {
    color: black;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.7px;
  }
  button:hover {
    animation: rotate 0.7s ease-in-out both;
  }
  button:hover span {
    animation: storm 0.7s ease-in-out both;
    animation-delay: 0.06s;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg) translate3d(0, 0, 0);
    }
    25% {
      transform: rotate(3deg) translate3d(0, 0, 0);
    }
    50% {
      transform: rotate(-3deg) translate3d(0, 0, 0);
    }
    75% {
      transform: rotate(1deg) translate3d(0, 0, 0);
    }
    100% {
      transform: rotate(0deg) translate3d(0, 0, 0);
    }
  }
  @keyframes storm {
    0% {
      transform: translate3d(0, 0, 0) translateZ(0);
    }
    25% {
      transform: translate3d(4px, 0, 0) translateZ(0);
    }
    50% {
      transform: translate3d(-3px, 0, 0) translateZ(0);
    }
    75% {
      transform: translate3d(2px, 0, 0) translateZ(0);
    }
    100% {
      transform: translate3d(0, 0, 0) translateZ(0);
    }
  }

  .btn-shine {
    border: 1px solid;
    overflow: hidden;
    position: relative;
    justify-self: center;
    align-self: center;
  }
  .btn-shine span {
    z-index: 20;
  }
  .btn-shine:after {
    background: tomato;
    content: "";
    height: 155px;
    left: -75px;
    opacity: 0.4;
    position: absolute;
    top: -50px;
    transform: rotate(35deg);
    transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
    width: 50px;
    z-index: -10;
  }
  .btn-shine:hover:after {
    left: 120%;
    transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
  }
  .inspire a {
    text-decoration: none;
  }

  #SearchOptions {
    display: grid;
    grid-template-columns: 50% 50%;
    justify-self: center;
    align-self: center;
    margin: 5% 25% 0 25%;
  }
</style>