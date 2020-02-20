<template>
  <div class="wrapper" style="padding: 20px;">
      <div id="myModal" class="modal">

          <!-- Modal content -->
          <div id="ModalContent" class="modal-content">
              <span v-on:click="ClosePopUp" class="close">&times;</span>
              <h2 style="display: block; margin-bottom: 30px">{{ModalButtons.Question}}</h2>
              <div style="width: 200px; display: inline-block;  white-space: nowrap;" v-for="Option in ModalButtons.OptionsList" v-bind:key="Option.Text">
                <button style="display: inline-block; white-space: nowrap;" v-on:click="CommandFromModal(Option)">{{Option.Text}}</button>
              </div>
          </div>

      </div>
      <!-- The Modal -->

      <div v-if="correct === true">
          <button v-on:click="PopUp" id="myBtn">Open Modal</button>







          <div id="tabs">
              <button id="tab-font" v-on:click="selectFont" style="background-color: #dadbe0;border-bottom: 1px #dadbe0 solid">Fonts</button>
              <button id="tab-alignment" v-on:click="selectAlign" style="background-color: white; border-bottom: 1px gray solid">Alignment</button>
              <button id="tab-insert" v-on:click="selectInsert" style="background-color: white; border-bottom: 1px gray solid">Insert</button>
          </div>
      <div id="control-bar" style="height: 20%;">
        <div style="position: relative;">
          <span>
            <div v-if="selected ==='Font'" class="command-bar" style="display: block; padding-left: 2%">
              <button v-for="command in fontCommands" class="format-button" v-bind:key="command.cmd" v-on:click="doCommand(command)" >
                {{command.text}}
              </button>
            </div>
            <div  v-if="selected ==='Align'" class="command-bar" style="display: inline-block; padding-left: 2%;">
              <button v-for="command in alignCommands" class="format-button" v-bind:key="command.cmd" v-on:click="doCommand(command)" >
               {{command.text}}
              </button>
            </div>
            <div  v-if="selected ==='Insert'" class="command-bar" style="display: inline-block; padding-left: 2%">
              <button v-for="command in insertCommands" class="format-button" v-bind:key="command.cmd" v-on:click="doCommand(command)" >
                {{command.text}}
              </button>
            </div>
            <div  class="command-bar" style="display: inline-block; padding-right: 2%; border: 1px gray solid; border-top: none; border-radius: 0 0 20px 0; padding-bottom: 5px" >
              <button v-for="command in removeCommands" class="format-button" v-bind:key="command.cmd" v-on:click="doCommand(command)" style="float: right; margin-right: 10px">
                <i class="command.icon"></i>{{command.text}}
              </button>
            </div>

          </span>

        </div>
        <button class="get-html" v-on:click="getHTML"> Save to Blogsite! </button>

        <!--<span><code class="btn btn-xs %btnClass%" title="%desc%" onmousedown="event.preventDefault();" onclick="doCommand(\'%cmd%\')"><i class="%iconClass%"></i> %cmd%</code></span>'-->

      </div>
          <br>
          <div style="position: relative; width: 75%; margin-left: auto; margin-right: auto">
             <div id="Title" contenteditable="true" style="margin-top: 10px;"> Title </div>
              <div id="blurb" contenteditable="true" style="margin-top: 10px;"> Blurb</div>
              <div id="content" contenteditable="true" style="margin-top: 10px;">Content</div>
              <div id="author" contenteditable="true" style="margin-top: 10px;"> Author</div>
            <div id="When" contenteditable="true" style="margin-top: 10px;"> When</div>
            <div id="Where" contenteditable="true" style="margin-top: 10px;"> Where</div>
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
        parms: [{
          "cmd": "aCommandName",
          "desc": "A DOMString representing the name of the command"
        }, {
          "cmd": "aShowDefaultUI",
          "desc": "A Boolean indicating whether the default user interface should be shown. This is not implemented in Mozilla."
        }, {
          "cmd": "aValueArgument",
          "desc": "A DOMString representing some commands (such as insertimage) require an extra value argument (the image's url). Pass an argument of null if no argument is needed."
        }],
        fontCommands: [
          {
            "cmd": "backColor",
            "text": "Background Color",
            "val": "rgba(1,1,1,0.5)",
            "desc": "Changes the document background color. In styleWithCss mode, it affects the background color of the containing block instead. This requires a color value string to be passed in as a value argument. (Internet Explorer uses this to set text background color.)"
          },
          {
            "cmd": "foreColor",
            "text": "Font Color",
            "val": "rgba(0,0,0,0.5)",
            "desc": "Changes a font color for the selection or at the insertion point. This requires a color value string to be passed in as a value argument."
          },
            /* @import url('https://fonts.googleapis.com/css?family=Big+Shoulders+Text:100,400,600|Montserrat&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Bebas+Neue|Montserrat&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500i&display=swap');?*/
          {
            "cmd": "fontName",
            "val": "'Inconsolata', monospace",
            "text": "Font Style",
              "Modal": "true",
              "Question": "What Font would you like?",
              'OptionsList': [
                  {
                      "cmd": "fontName",
                      'Text': 'Bebas Neue'
                  },
                  {
                      "cmd": "fontName",
                      'Text': 'Big Shoulders Text'
                  },
                  {
                      "cmd": "fontName",
                      'Text': 'Comic Sans Ms'
                  }

              ],
            "desc": "Changes the font name for the selection or at the insertion point. This requires a font name string (\"Arial\" for example) to be passed in as a value argument."
          },

          {
            "cmd": "fontSize",
            "val": "1-7",
            "text": "Font Size",
            "icon": "text-height",
            "desc": "Changes the font size for the selection or at the insertion point. This requires an HTML font size (1-7) to be passed in as a value argument."
          },
          {
            "cmd": "bold",
            "text": "Bold",
            "icon": "bold",
            "desc": "Toggles bold on/off for the selection or at the insertion point. (Internet Explorer uses the STRONG tag instead of B.)"
          },
          {
            "cmd": "italic",
            "text": "Italics",
            "icon": "italic",
            "desc": "Toggles italics on/off for the selection or at the insertion point. (Internet Explorer uses the EM tag instead of I.)"
          },
          {
            "cmd": "subscript",
            "icon": "subscript",
            "text": "Subscript",
            "desc": "Toggles subscript on/off for the selection or at the insertion point."
          },
          {
            "cmd": "superscript",
            "icon": "superscript", "text": "Superscript",
            "desc": "Toggles superscript on/off for the selection or at the insertion point."
          },
          {
            "cmd": "underline",
            "icon": "underline",
            "text": "Underline",
            "desc": "Toggles underline on/off for the selection or at the insertion point."
          },
          {
            "cmd": "strikeThrough",
            "icon": "strikethrough",
            "text": "Strikethrough",
            "desc": "Toggles strikethrough on/off for the selection or at the insertion point."
          },
        ],
        alignCommands: [
          {
            "cmd": "justifyFull",
            "icon": "align-justify",
            "text": "Justify",
            "desc": "Justifies the selection or insertion point."
          },
          {
            "cmd": "justifyCenter",
            "icon": "align-center",
            "text": "Center",
            "desc": "Centers the selection or insertion point."
          },
          {
            "cmd": "justifyLeft",
            "icon": "align-left",
            "text": "Align Left",
            "desc": "Justifies the selection or insertion point to the left."
          }, {
            "cmd": "justifyRight",
            "icon": "align-right",
            "text": "Align Right",
            "desc": "Right-justifies the selection or the insertion point."
          },
          {
            "cmd": "indent",
            "icon": "indent",
            "text": "Indent",
            "desc": "Indents the line containing the selection or insertion point. In Firefox, if the selection spans multiple lines at different levels of indentation, only the least indented lines in the selection will be indented."
          },
          {
            "cmd": "outdent",
            "icon": "outdent",
            "text": "Outdent",
            "desc": "Outdents the line containing the selection or insertion point."
          },
        ],
          /*
          doCommand: function (command) {
        var val = (typeof command.val !== "undefined") ? prompt("Value for " + command.cmd + "?", command.val) : "";
        document.execCommand(command.cmd, false, (val || ""));}
           */
        insertCommands: [
          {
            "cmd": "createLink",
            "val": "https://twitter.com/netsi1964",
            "text": "HyperLink",
            "icon": "link",
            "desc": "Creates an anchor link from the selection, only if there is a selection. This requires the HREF URI string to be passed in as a value argument. The URI must contain at least a single character, which may be a white space. (Internet Explorer will create a link with a null URI value.)"
          },
          {
            "cmd": "insertImage",
            "val": "http://dummyimage.com/160x90",
            "text": "Insert Image URL",
            "icon": "picture-o",
            "desc": "Inserts an image at the insertion point (deletes selection). Requires the image SRC URI string to be passed in as a value argument. The URI must contain at least a single character, which may be a white space. (Internet Explorer will create a link with a null URI value.)"
          },
          {
            "cmd": "insertOrderedList",
            "icon": "list-ol",
            "text": "Toggle Ordered List",
            "desc": "Creates a numbered ordered list for the selection or at the insertion point."
          }, {
            "cmd": "insertUnorderedList",
            "icon": "list-ul",
            "text": "Toggle Unordered List",
            "desc": "Creates a bulleted unordered list for the selection or at the insertion point."
          },
          {
            "cmd": "insertHorizontalRule",
            "text": "Insert Horizontal Line",
            "desc": "Inserts a horizontal rule at the insertion point (deletes selection)."
          },
        ],
        removeCommands:[{
          "cmd": "removeFormat",
          "text": "Clear Format",
          "desc": "Removes all formatting from the current selection."
          },
          {
          "cmd": "unlink",
          "icon": "chain-broken",
          "text": "Remove HyperLink",
          "desc": "Removes the anchor tag from a selected anchor link."
          }
        ],
        Title: '',
        Content: '',
        Blurb: '',
        Link: '',
        Author: '',
        Date: '',
        When: '',
        Where: '',
        thumbnail:''

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
        PopUp: function() {
            document.getElementById("myModal").style.display = "block"
        },
        ClosePopUp: function() {
            document.getElementById("myModal").style.display = "none"
        },


        selectFont: function(){


            // $('tab-font').css({'background-color': '#dadbe0'});
            // $('tab-alignment').css({'background-color': 'white'});
            // $('tab-insert').css({'background-color': 'white'});
            document.getElementById('tab-font').style.backgroundColor = '#dadbe0';
            document.getElementById('tab-font').style.borderBottom = '1px #dadbe0 solid';
            document.getElementById('tab-alignment').style.backgroundColor = 'white';
            document.getElementById('tab-alignment').style.borderBottom = "1px gray solid";
            document.getElementById('tab-insert').style.backgroundColor = 'white';
            document.getElementById('tab-insert').style.borderBottom = '1px gray solid';
            this.selected = 'Font';
        },
        selectAlign: function(){
            document.getElementById('tab-font').style.backgroundColor = 'white';
            document.getElementById('tab-font').style.borderBottom = '1px gray solid';
            document.getElementById('tab-alignment').style.backgroundColor = '#dadbe0';
            document.getElementById('tab-alignment').style.borderBottom = '1px #dadbe0 solid';
            document.getElementById('tab-insert').style.backgroundColor = 'white';
            document.getElementById('tab-insert').style.borderBottom = '1px gray solid';
            this.selected = 'Align';
        },
        selectInsert: function(){
            document.getElementById('tab-font').style.backgroundColor = 'white';
            document.getElementById('tab-font').style.borderBottom = '1px gray solid';
            document.getElementById('tab-alignment').style.backgroundColor = 'white';
            document.getElementById('tab-alignment').style.borderBottom = '1px gray solid';
            document.getElementById('tab-insert').style.backgroundColor = '#dadbe0';
            document.getElementById('tab-insert').style.borderBottom = '1px #dadbe0 solid';
            this.selected = 'Insert';
        },
        checkPass: function() {
          this.userInput = document.getElementById("password").value;
          console.log(this.userInput)
          if (this.userInput === this.password) {
              this.correct = true;

          }
        },
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
            this.Content = document.getElementById('content').innerHTML;
            this.Blurb = document.getElementById('blurb').innerText;
            this.Author = document.getElementById('author').innerText;
            this.When = document.getElementById('When').innerText;
            this.Where = document.getElementById('Where').innerText;
            this.Date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

            const response = await BlogController.createBlog({
              Title: this.Title,
              Content: this.Content,
              Blurb: this.Blurb,
              Author: this.Author,
              Date: this.Date,
              When: this.When,
              Where: this.Where,
              Thumbnail: self.data

            });
            console.log(response.Date);
            alert("Event has been added!");
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
