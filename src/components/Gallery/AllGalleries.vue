<template>
  <div id="AboutUsPage">
    <div v-if="CurrentGallery !== undefined">
      <Gallery :GalleryVue="CurrentGallery" :image-table="ImageTable"></Gallery>
    </div>
    <div v-if="CurrentGallery === undefined">
      <div  v-on:click="ClickedGallery(GalleryChunk)" v-for="GalleryChunk in Galleries" :key="GalleryChunk.id">
        <h1>{{GalleryChunk.Title}}</h1>
        <img class="Thumbnail" v-bind:src="GalleryChunk.Image" alt="None">
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
                    this.thumbnail = this.blogs[9].Thumbnail.data;

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
            SortNewBlogs: function() {
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
                    if((this.Galleries[i].Title.includes(SearchText) || this.Galleries[i].Blurb.includes(SearchText))) {
                        FilterList.push(this.Galleries[i]);
                        console.log("Added new chunk to list");
                        console.log(FilterList);
                    }
                }
                console.log(FilterList);
                this.Galleries = FilterList.slice();
                for(i=0; i < this.Galleries.length; i++) {
                    this.Galleries[i]["Type"] = i;
                }
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
  #AboutUsTitle {

    font-family: 'Cinzel', serif;
    font-size: 2.5vw;
    margin: 0% 15% 3% 1%;

  }

  #AboutUsPage {
    width: 100vw;

  }
  #AboutUsContent {
    font-size: 1.2vw;
    font-weight: 300;
    margin: 3% 10% 3% 1%;
    font-family: 'Roboto', sans-serif;
  }
  .Thumbnail {
    width: 50vw;
    box-shadow:
      -50px -50px 0 -40px tomato,
      50px 50px 0 -40px tomato;
  }
  .ImageGallery {
    display: inline-block;
    width: 50vw;
  }
  .GalleryImages {
    display: inline-block;
  }
</style>