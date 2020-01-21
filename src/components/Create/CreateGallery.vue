<template>
  <div class="wrapper" style="padding: 20px;">
    <div v-if="correct">

        <button class="get-html" v-on:click="getHTML"> Save to Blogsite! </button>

          <br>
          <div style="position: relative; width: 75%; margin-left: auto; margin-right: auto">
             <div id="Title" contenteditable="true" style="margin-top: 10px;"> Title </div>
        <form id="uploadbanner" enctype="multipart/form-data" style="margin-top: 10px;">
            <label>Thumbnail</label><input id="thumbnail" ref="file" name="myfile" type="file" required @change="onFileChange" accept="image/*"/>
          </form>
          </div>

    </div>
      <div v-else>
          <label>Please Enter the Password
          <input id="password">
              <button v-on:click="checkPass">Submit Password</button>
      </label>
      </div>
  </div>
</template>

<script>
  import BlogController from '@/services/BlogServices'
  // import JQuery from 'jquery'


  export default {
    name: 'HelloWorld',
      data() {
      return {
          selected: "Font",
        userInput: '',
          correct: true,
          ModalButtonSize: 0,
          ModalButtons: [{'Question': 'TestingStuff'}],
        password: "1234",
        Title: '',
        thumbnail:'',

      }

    },
    mounted() {
        // Get the modal
        var modal = document.getElementById("myModal");

// Get the button that opens the modal
        var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
        btn.onclick = function() {
            modal.style.display = "block";
        },

// When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        },

// When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                document.getElementById("myModal").style.display = "none";

            }
        }


    },

    methods: {


      sendHtml: function () {
        this.userInput = document.getElementById('userInput').value;
        var outputSection = document.getElementById('output');
        outputSection.innerHTML = this.userInput;
      },
      doCommand: function (command) {
        if(command.Modal === undefined) {
          var val = (typeof command.val !== "undefined") ? prompt("Value for " + command.cmd + "?", command.val) : "";
          document.execCommand(command.cmd, false, (val || ""));
        } else {
            this.ModalButtons = command;
            this.PopUp();
        }

      },
        CommandFromModal(command) {
            document.execCommand(command.cmd, false, (command.Text || ""));
        },

      async onFileChange(){

        var blobData =  this.$refs.file.files[0];
        // let blob = new Blob([blobData],{type: 'image/*'});

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

        async getHTML() {
          try {

            this.Title = document.getElementById('Title').innerText;

            const response = await BlogController.createGallery({
              Title: this.Title,
              Image: self.data

            });
            console.log(response.Date);
            //Clear Fields after saving to database

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
</style>
