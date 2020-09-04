<template>
  <div id="Wrapper">
    <transition name="fade">
      <div id="Load" v-if="DeleteMoment" class="active">
        <div class="Title"> Delete {{this.CurrentGallery.Title}}?</div>
        <div>
          <div class="button" style="border: green solid 3px; background-color: rgba(0, 255, 0, 0.2)" v-on:click="Delete(CurrentGallery)"> Yes </div>
          <div class="button" style="border: red solid 3px;  background-color: rgba(255, 0, 0, 0.2)" v-on:click="Clear()"> No </div>
        </div>
      </div>
    </transition>
    <div id="BlackBackground" v-if="DeleteMoment"></div>
    <div id="Title"> Remove Gallery </div>
    <div id="DeleteZone">
    <div v-on:click="CheckDelete(GalleryChunk)"  v-for="GalleryChunk in Galleries" :key="GalleryChunk.id" class="GalleryIcon">
          <div class="Cross2"></div>
          <h1 class="GalleryTitle">{{GalleryChunk.Title}}</h1>
          <img class="Thumbnail" :src="myUrl+'/uploads/Thumbnails/'+GalleryChunk.Location" alt="None">
      </div>
    </div>
    </div>

</template>

<script>
    import BlogController from '@/services/BlogServices'
    //import {EventBus} from "../../App";
    //import JQuery from 'jquery';
    //let $ = JQuery;
    import {BaseURL} from '@/services/api';
    export default {
        name: "RemoveGallerys",
        data() {
            return {
                myUrl: BaseURL,
                blogs: [],
                Galleries: [],
                GalleryID: '',
                Closing: '',
                CurrentGallery: null,
                DeleteMoment: false,
            }
        },
        beforeMount() {
            this.getGalleries();
        },
        methods: {
            async CheckDelete(Gallery) {
              this.CurrentGallery = Gallery;
              this.DeleteMoment = true;
            },
            async Delete(Gallery) {
                this.GalleryID = Gallery.id;
                const response = await BlogController.deleteGallery({
                  Thumbnail: Gallery.Location,
                  id: this.GalleryID,
                });
                console.log(response);
                alert('Removed Gallery: '+Gallery.Title);
                this.getGalleries();
                this.CurrentGallery = null;
                this.DeleteMoment = false;
            },
            async Clear() {
                this.CurrentGallery = null;
                this.DeleteMoment = false;
            },

            getThumbnail(pet) {
                var IMG = require.context('../../../server/uploads/Thumbnails', false, /\.jpeg$/);
                console.log(pet);
                console.log(IMG);
                return IMG('./' + pet + '.jpeg');
            },
            async getGalleries() {
                try {

                    const blogs = await BlogController.getAllGallery();
                    //const images = await BlogController.getImageTables();
                    //console.log(blogs.data.Galleries);

                    //this.ImageTable = images.data.Galleries;
                    //console.log(this.ImageTable);
                    this.blogs = blogs.data.Galleries;
                    this.ReRollBlogs();
                    //this.ReRollBlogs();

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
            },
            async SortNewBlogs() {
                //console.log("Was this triggered?");
                this.Galleries = this.blogs.slice();
                let BlogLength = this.Galleries.length;
                let SearchText = "";
                //if(this.Reversed) {
                  //  this.Galleries = this.Galleries.reverse();
                //}
                //this.Reversed = !this.Reversed;
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
            }
        }

    }

</script>

<style scoped>
#DeleteZone {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-grow: 1;
  justify-content: center;
  align-items: center
}
  .GalleryIcon{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    height: 12vw;
    width: 12vw;
    margin: 1vw;
    padding: 1vw;
    background: rgba(30, 30, 30, 0.6);
    border-radius: 10%;
  }
  .Thumbnail {
    max-width: 80%;
    max-height: 60%;
    box-shadow:
      -30px -30px 0 -20px tomato,
      30px 30px 0 -20px tomato;
  }
  .GalleryTitle {
    margin: initial;
    font-family: 'Cinzel', serif;
    font-size: 1.4rem;
    color: whitesmoke;
  }
  #Title {
    color: black;
    font-size: 5vw;
  }
  .Cross2 {
    //transform: translate(-1vw, -1vw);
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: orangered;
    transition: 0.5s;
    border-radius: 10%;
  }
  .Cross2:hover {
    opacity: 0.4;
    cursor: pointer;
  }

.Cross2:before,.Cross2:after{
  content:'';
  position:absolute;
  width:100%;
  height:10px;
  background-color:white;
  border-radius:2px;
  top:50%;
  box-shadow:0 0 2px 0 #ccc;
}

.Cross2:before{
  -webkit-transform:rotate(45deg);
  -moz-transform:rotate(45deg);
  transform:rotate(45deg);
  left:2px;
}
.Cross2:after{
  -webkit-transform:rotate(-45deg);
  -moz-transform:rotate(-45deg);
  transform:rotate(-45deg);
  right:2px;
}
.fade-enter-active {
  animation: bounce-in 1.5s;
}
.fade-leave-active {
  animation: bounce-in 1.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.5);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
#Load {
  background: #333;
  font-size: 2vw;
  color: whitesmoke;
  padding: 5%;
  border-radius: 30%;
  z-index: 3;
  max-width: 100vw;
  max-height: 100vh;
//width: 200%;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow:  0vw  0vw 100vw 100vw rgba(0,0,0,0.7);
}
#BlackBackground {
  width: 100vw;
  height: 100vh;
  top: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0);
  z-index: -1;
}
  .button {
    font-size: 2vw;
    padding: 10px;
    margin: auto 50px;
    transition: 0.5s;
    display: inline-block;
  }
  .button:hover {
    border-radius: 40%;
    cursor: pointer;
  }
  .Title {
    font-family: 'Cinzel', serif;
    padding-bottom: 50px;
    font-size: 3vw;
  }
</style>