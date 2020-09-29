<template>
  <div>
    <div class="wrapper" style="padding: 20px;">
      <transition name="fade">
        <div id="Load" v-if="Uploading" class="active">
          <div id="Circle"></div>
          <a v-on:click="Uploading = false" href="#" class="close"></a>
          <LoadArea style="margin: auto; transform: scale(1.2)"></LoadArea>
          <div v-if="Uploaded">
            Done!
          </div>
          <div v-else>
            Uploading Images
          </div>
          <div id="Numbers">
            {{this.UploadedPics}} out of {{this.files.length}} Done.
          </div>
          <div v-if="Uploaded" id="Links" style="margin-top: 10px; color: lightskyblue; text-decoration: none">
            <router-link to="/">Return Home</router-link>
          </div>
        </div>
      </transition>
      <div v-if="Uploading" id="BlackBackground"></div>
      <div >

        <button style="padding: 1vw" class="get-html" v-on:click="getHTML"> Save to Gallery! </button>

            <br>
            <div  id="CreateArea" style="margin-top: 2rem; position: relative; width: 75%; margin-left: auto; margin-right: auto">
               <div class="GalleryTitle" id="Title" contenteditable="true"> TITLE (Click here) </div>
                <form id="uploadbanner" enctype="multipart/form-data" style="margin-top: 10px;">
                  <label class="GalleryTitle">Thumbnail <br></label><input id="thumbnail" ref="Thumbnail" name="myfile" type="file" required @change="onFileChange" accept="image/*"/>
                </form>

              <div  id="ImageArea" v-cloak @drop.prevent="addFile" @dragover.prevent>
                <div v-if="files.length < 1" class="TitleInfo">Files to Upload (Drag them over)</div>
                <ul style="margin: initial">
                  <li style=" font-size: 2rem" v-for="file in files" v-bind:key="file.name">
                    {{ file.name }} ({{ file.size | kb }}) <button @click="removeFile(file)" title="Remove">X</button>
                  </li>
                </ul>
              </div>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
  import GalleryController from '@/services/BlogServices'
  // import JQuery from 'jquery'
// <button class="get-html" v-on:click="getHTML"> Save to Blogsite! </button>
  import Vue from 'vue'
  import LoadArea from "./LoadArea";
  Vue.filter('kb', function (num) {
      // jacked from: https://github.com/sindresorhus/pretty-bytes
      if (typeof num !== 'number' || isNaN(num)) {
          throw new TypeError('Expected a number');
      }

      var exponent;
      var unit;
      var neg = num < 0;
      var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      if (neg) {
          num = -num;
      }

      if (num < 1) {
          return (neg ? '-' : '') + num + ' B';
      }

      exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
      num = (num / Math.pow(1000, exponent)).toFixed(2) * 1;
      unit = units[exponent];

      return (neg ? '-' : '') + num + ' ' + unit;
  });
  export default {
    name: 'HelloWorld',
      components: {LoadArea},
      data() {
      return {
          correct: true,
        password: "1234",
        Title: '',
        thumbnail:'',
          CurrentGalleryID: 0,
          blogs: undefined,
          CurrentGalleryId: 0,
          dataImages: [],
          TotalPictures: 1,
          ImagesShowCase: [],
          files:[],
          Uploaded: false,
          Uploading: false,
          UploadedPics: 0,
      }

    },
    mounted() {

    },

    beforeMount() {
        this.getBlogs()
    },
    computed: {

    },
    methods: {
        addFile(e) {
            let droppedFiles = e.dataTransfer.files;
            console.log(e.target);
            let data = new FormData();
            //let file = e.target;

            data.append('name', 'my-file');

            console.log(data);
            if(!droppedFiles) return;
            // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
            ([...droppedFiles]).forEach(f => {
                this.files.push(f);
                data.append('file', f);
                console.log(data);
                console.log(f);
            });
            for (var pair of data.entries()) {
                console.log(pair[0]+ ', ' + pair[1]);
            }
        },
        removeFile(file){
            this.files = this.files.filter(f => {
                return f !== file;
            });
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



        /*function readFile(file, onloadCallback) {
          var reader = new FileReader();
          reader.onload = onloadCallback;
          reader.readAsDataURL(file)
        }*/
        self.data =  e.target.files[0];


      },


        async ReadImage(blobData) {

            function readFile(file, onloadCallback) {
                var reader = new FileReader();
                reader.onload = onloadCallback;
                reader.readAsDataURL(file)
            }
            this.CurrentGalleryID = this.CurrentGalleryId;
            //self.ImageData = '';
            //let Untouched = this.files;
            console.log(this.$refs.thumbnail);
            console.log(this.files);
            const self = this;
            readFile(blobData, async function (e) {
                self.ImageData = e.target.result;
                const BlobBoi = blobData;
                let BlobName= BlobBoi.name + Date.now() + '.jpeg';
                const formdata = new FormData();
                //formdata.append('name', 'ImageTransfer');
                let blob = BlobBoi.slice(0, BlobBoi.size, 'image/png');
                let newFile = new File([blob], BlobName, {type: 'image/png'});
                formdata.append('file', newFile);

                for (var pair of formdata.entries()) {
                    console.log(pair[0] + ', ' + pair[1]);
                }
                try {
                    //await axios.post('/upload', formdata);
                    const response = await GalleryController.Upload(formdata);
                    console.log("Sent Image!");
                    console.log(response);


                } catch (e) {
                    console.log(e);
                }
                //console.log(this.files[0]);

                const response = await GalleryController.createImageTable({
                    GalleryLink: self.CurrentGalleryID,
                    Location: BlobName,
                });
                console.log("Sent ImageTable!");
                console.log(response);
                self.UploadedPics += 1;
                console.log('this.UploadedPics = '+self.UploadedPics+' === '+self.files.length+' = Files');
                if(self.UploadedPics == self.files.length) {
                    console.log("i'm here ");
                    console.log("------------------------------------------------");
                    console.log("hellppp");
                    self.Uploaded = true;
                }
            });
        },

      async getHTML() {
        try {

          this.Title = document.getElementById('Title').innerText;
          this.Uploading = true;
          console.log("Pushing Gallery");
          const BlobBoi = self.data;
          let BlobName= BlobBoi.name + Date.now() + '.jpeg';
          const formdata = new FormData();
          //formdata.append('name', 'ImageTransfer');
          let blob = BlobBoi.slice(0, BlobBoi.size, 'image/png');
          let newFile = new File([blob], BlobName, {type: 'image/png'});
          formdata.append('file', newFile);
          const response = await GalleryController.createGallery({
            Title: this.Title,
            Location: BlobName
          });
            console.log(response.Date);
            try {
                //await axios.post('/upload', formdata);
                await GalleryController.UploadThumbnail(formdata);
                console.log("Sent one!");
            } catch (e) {
                console.log(e);
            }
          let i = 0;
          for(i=0; i < this.files.length; i++) {
              await this.ReadImage(this.files[i]);
          }

          //alert("Gallery has been added!");

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
  #uploadbanner {
    width: 100%;
  }
  #CreateArea {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  #Load {
    background: #333;
    font-size: 2vw;
    color: whitesmoke;
    padding: 5%;
    border-radius: 30%;
  }
  .active {
    z-index: 3;
    max-width: 90vw;
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
  #ImageArea {
    padding: 2rem;
    max-height: 30vh;
    min-width: 40vw;
    overflow-y: auto;
    border: 10px dotted lightskyblue  ;
  }
  .GalleryTitle {
    color: black;
    font-family: 'Cinzel', serif;
    font-size: 2.5vw;
    //display: inline-block;
  }
#Title {
  border: #333 solid 2px;
}

  .fade-enter-active {
    animation: bounce-in 0.75s ease;
  }
  .fade-leave-active {
    animation: bounce-in 0.75s ease reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: translate(-50%, -50%) scale(0) translateZ(1px);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.5) translateZ(0px);
    }
    100% {
      transform: translate(-50%, -50%) scale(1) translateZ(-1px);
    }
  }
  #Circle {
    position: absolute;
    z-index: 2;
    border-radius: 100%;
    background-color: lightyellow;
    right: 56px;
    top: 47px;
    width: 40px;
    height: 40px;
    opacity: 0.4;
  }
  .close {
    position: absolute;
    right: 60px;
    top: 50px;
    width: 32px;
    height: 32px;
    opacity: 0.6;
    z-index: 99;
  }
  .close:hover {
    opacity: 1;
  }
  .close:before, .close:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 2px;
    background-color: #CCC;
  }
  .close:before {
    transform: rotate(45deg);
  }
  .close:after {
    transform: rotate(-45deg);
  }
  .TitleInfo {
    font-size: 4rem;
  }

</style>
