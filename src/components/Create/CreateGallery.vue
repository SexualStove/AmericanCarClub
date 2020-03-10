<template>
  <div class="wrapper" style="padding: 20px;">
    <div >

      <button style="padding: 1vw" class="get-html" v-on:click="getHTML"> Save to Gallery! </button>

          <br>
          <div style="position: relative; width: 75%; margin-left: auto; margin-right: auto">
            <h1 style="margin-top: 5vw"> Icon And Title</h1>
             <div id="Title" contenteditable="true" style="margin-top: 10px;"> TITLE (Click here) </div>
              <form id="uploadbanner" enctype="multipart/form-data" style="margin-top: 10px;">
                <label>Thumbnail </label><input id="thumbnail" ref="Thumbnail" name="myfile" type="file" required @change="onFileChange" accept="image/*"/>
              </form>

            <h1 style="margin-top: 5vw"> Adding images to the gallery</h1>
            <div>
              <form v-for="i in TotalPictures" :key="i" class="uploadbanner" enctype="multipart/form-data" style="margin-top: 10px;">
                <label>Image: </label>

                  <input class="image" ref="file" name="myfile" type="file" required @change="onFileChangeImages" accept="image/*"/>
              </form>
<!--                need to convert image to blob file fck
                <img v-for="image in ImagesShowCase" :key="image" class="preview" v-bind:src="image" alt="no">
                    <button id="MorePics" v-on:click="MorePictures">More Pictures!</button>  -->

            </div>
          </div>

    </div>
  </div>
</template>

<script>
  import GalleryController from '@/services/BlogServices'

  // import JQuery from 'jquery'
// <button class="get-html" v-on:click="getHTML"> Save to Blogsite! </button>

  export default {
    name: 'HelloWorld',
      data() {
      return {
          correct: true,
        password: "1234",
        Title: '',
        thumbnail:'',
          blogs: undefined,
          CurrentGalleryId: 0,
          dataImages: [],
          TotalPictures: 1,
          ImagesShowCase: [],
      }

    },
    mounted() {
    },

    beforeMount() {
        this.getBlogs()
    },
    methods: {

        MorePictures() {
            this.TotalPictures += 1;
        },

        async getBlogs() {
            try {
                const blogs = await GalleryController.getAllGallery();

                this.blogs = blogs.data.Galleries;
                if(this.blogs.length  === 0) {
                    this.CurrentGalleryId = 1;
                } else {
                    this.CurrentGalleryId = this.blogs.reverse()[0].id + 1;
                }


            } catch (e) {
                console.log(e);
                this.myUrl = e;
            }
        },

      sendHtml: function () {
        this.userInput = document.getElementById('userInput').value;
        var outputSection = document.getElementById('output');
        outputSection.innerHTML = this.userInput;
      },


      async onFileChange(e){

        var blobData =  e.target.files[0];

        function readFile(file, onloadCallback) {
          var reader = new FileReader();
          reader.onload = onloadCallback;
          reader.readAsDataURL(file)
        }
        self.data = '';
        readFile(blobData, function(e){
          self.data = e.target.result;

        });

      },

        async onFileChangeImages(e){



              var blobData =  e.target.files[0];
              var nameArray = this.dataImages.map(function(el) {return el.name;});

              // Check if image exists already
              if (nameArray.includes(blobData.name))
              {
                  // do nothing
              } else
              {
                  this.dataImages.push(blobData);
                  var reader = new FileReader();
                  /*//console.log(blobData);
                  await this.ImagesShowCase.push(reader.onload = function(e) {
                      console.log(e.target.result);

                      //document.getElementById("preview").src=e.target.result;
                      document.getElementById("preview").height=150;
                      document.getElementById("preview").width=150;
                      return  e.target.result;
                  });
                  await console.log(this.ImagesShowCase);*/

                  reader.readAsDataURL(blobData);
              }
            this.MorePictures();



        },
        async ReadImage(blobData) {

            function readFile(file, onloadCallback) {
                var reader = new FileReader();
                reader.onload = onloadCallback;
                reader.readAsDataURL(file)
            }
            self.GalleryId = this.CurrentGalleryId;
            self.ImageData = '';
            readFile(blobData, function(e){
                self.ImageData = e.target.result;
                console.log('Pushing now');
                console.log(self.GalleryId);
                GalleryController.createImageTable({
                    GalleryLink: self.GalleryId,
                    Image: e.target.result
                });
            });
        },

      async getHTML() {
        try {

          this.Title = document.getElementById('Title').innerText;

          console.log("Pushing Gallery");
          const response = await GalleryController.createGallery({
            Title: this.Title,
            Image: self.data
          });
            console.log(response.Date);
          let i = 0;
          for(i=0; i < this.dataImages.length; i++) {
              await this.ReadImage(this.dataImages[i]);
          }
          alert("Gallery has been added!");

        } catch (err) {
          this.error = err;
          console.log(this.error)
        }



    }
  },

  }


</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #userInput{
    height: 500px;
    width: 100%;
  }
  .command-bar {
    width: 100%;
    height: 100%;
    position: relative;
      float: left;
      padding-top: 10px;
      display: none;
      /*animation: fade-in 0.5s;*/
      background-color: #dadbe0;
      border: 1px gray solid;
      border-bottom: none;
      border-top: none;
  }
  .command-bar button {
      float: left;
      padding: 5px;
      margin-left: 5px;


  }
  #control-bar{
    height: 200px;
      padding-bottom: 2%;

  }
    #tabs {
        /*background-color: #dadbe0;*/
        /*border-top: 1px gray solid;*/
        border-left: 1px gray solid ;
        border-right: 1px gray solid;

    }
    #tabs button{
        position: relative;
        width: 10%;
        float: left;
        left:-1px;
        border-top: 1px gray solid;
        border-left: 1px gray solid;
        border-right: 1px gray solid;
        border-bottom: none;
        /*background-color: #dadbe0;*/
        border-radius: 20px 20px 0 0;
    }
    button:focus{
        outline: none;
    }

    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }





  /* The Modal (background) */
  .modal {
      display: none; /* Hidden by default */
      position: fixed; /* Stay in place */
      z-index: 1; /* Sit on top */
      padding-top: 100px; /* Location of the box */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      overflow: auto; /* Enable scroll if needed */
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }

  /* Modal Content */
  .modal-content {
      background-color: #fefefe;
      margin: auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
      z-index: 1;
    display: inline-block;
  }

  /* The Close Button */
  .close {
      color: #aaaaaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
  }

  .close:hover,
  .close:focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
  }
  #MorePics {
    margin-top: 5vw;
    padding: 0.5vw;
  }
</style>
