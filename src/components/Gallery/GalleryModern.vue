<template>
    <div id="SingleGalleryArea" style="position: relative">
        <div id="ButtonBoi" v-on:click="BackOut()">
            <img id="ExitCar" src="../../assets/images/ExitCar.png" alt="None">
            <h3 id="BackButton">Back!</h3>
        </div>
        <div id="TopArea" v-bind:style="{'background-image': 'url('+myUrl+'/uploads/Thumbnails/'+GalleryVue.Location+')'}">
            <div id="TopText">
                <div id="GalleryTitle" style=" ">{{GalleryVue.Title}}</div>
            </div>
        </div>
        <div id="GalleryDescription" style="">{{GalleryVue.Description}}</div>
        <div id="GallerySolo">
            <section id="portfolio">
                <div class="project" v-for="Image in FilteredList" v-bind:key="Image.Location"
                     v-bind:style="{'background-image': 'url('+myUrl+'/uploads/'+Image.Location+')'}">
                    <div class="grid__overlay">
                        <button v-on:click="FullSize(Image.id)" class="viewbutton">View Full {{Image.id}}</button>
                    </div>
                </div>



                <div class="overlay">
                    <div class="overlay__inner">
                        <button v-on:click="FullSizeOff" class="close">close X</button>
                        <img style="max-height: 90vh; max-width: 90vw">
                    </div>
                </div>
            </section>

        </div>
        <div style="height: 5vw; display: flex; justify-content: center; align-content: center; padding: 2vw">
            <button class="Button1" style="height: 70%; box-shadow: 0 8px 16px 0 rgba(0,0,0,0.8), 0 6px 20px 0 rgba(0,0,0,0.8);" v-on:click="Download">Download Gallery</button>
        </div>
    </div>
</template>

<script>


    import BlogController from '@/services/BlogServices'
    import {EventBus} from "../../App";
    import JQuery from 'jquery';
    let $ = JQuery;
    export default {

        data() {
            return {
                blogContent: "",
                blogs: '',
                thumbnail: '',
                TotalBlogSize: 3,
                CurrentId: null,
                TransferBlogList: undefined,
                Reversed: false,
                FullSized: false,
                ImageTable: [],
                Start: 0,
                End: 6,
                CurrentImage: "",
                LoadTabe: false
            }
        },
        computed: {
            FilteredList() {
                if(this.LoadTabe) {
                    return []
                } else {
                    return this.ImageTable.slice(0,this.End);
                }
            },


        },
        props: ['GalleryVue', 'LoadTable', 'myUrl'],
        methods: {
            Selected(id) {
                let Image = null;
                for(Image in this.FilteredList) {
                    if(this.FilteredList[Image].id === id) {
                        return this.FilteredList[Image]
                    }
                }
                return null;
            },

            //"
            async Download() {
                window.open('https://inhousewebtest.site:8081/DownloadGallery'+this.GalleryVue.id);
            },

            getThumbnail(pet) {
                var images = require.context('../../../server/uploads/Thumbnails', false, /\.jpeg$/);
                return images('./'+pet);
            },
            getImage(pet) {
                var images = require.context('../../../server/uploads', false, /\.jpeg$/);
                return images('./'+pet);
            },
            CheckFull() {
              if(this.CurrentImage !== '') {
                  this.CurrentImage = ''
              }
            },

            Change(int) {
                this.End += int;
                this.Start += int;
                //console.log(this.End);
            },

          BackOut() {
                  EventBus.$emit('CurrentGallery', undefined);
            },

            FullSize(id) {
                this.CurrentId = id;
                //document.querySelector('.overlay');
                console.log(this.Selected(id));
                $(".overlay").css({ display: "grid" })
                console.log(this.myUrl+'/uploads/'+ this.Selected(id).Location);
                $(".overlay__inner img").attr('src', this.myUrl+'/uploads/'+ this.Selected(id).Location);
                console.log("help")
                //const overlayImage = document.querySelector('');
            },
            FullSizeOff() {
                this.CurrentId = null;
                //document.querySelector('.overlay');
                $(".overlay").css({ display: "none" })
                //const overlayImage = document.querySelector('.overlay__inner img');
            }
        },
        async beforeMount() {
            if (this.LoadTable) {
                console.log(this.GalleryVue);
                const images = await BlogController.getImageTables(this.GalleryVue.id);
                this.ImageTable = images.data.Galleries;
                console.log("Grabbed image ID: "+this.GalleryVue.id +" with this many images: "+this.ImageTable.length);
                console.log(this.ImageTable);
                this.LoadTable = false;
            }
        },
        mounted() {
            let self = this;
            this.$nextTick(function(){
                window.addEventListener("scroll", function() {
                    self.Scrolled = document.documentElement.scrollTop;
                    if ($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
                            self.End += 3;
                    }
                })
            });



            /*$("img").click(function() {
                console.log("colorClass");
            });
            $("img").on('click', function (event) {
                event.stopPropagation();
                event.stopImmediatePropagation();
                console.log("Cicked ffs");
                $('.active').not(this).addClass('non_active');
                $('.active').not(this).removeClass('active');

                if ($(this).hasClass('ImageGallery')) {
                    if ($(this).hasClass('active')) {
                        $(this).addClass('non_active');
                        $(this).removeClass('active');
                        $('#BlackBackground').backgroundColor = -1;
                        $('#BlackBackground').backgroundColor = 'rgba(0, 0, 0, 0);';
                        self.FullSized = false;
                    } else {
                        $(this).removeClass('non_active');
                        $(this).addClass('active');
                        $('#BlackBackground').zIndex = 2;
                        $('#BlackBackground').backgroundColor = 'rgba(0, 0, 0, 0.2);';
                        self.FullSized = true;
                    }
                }
            })*/
        }
    }
    //        //text-shadow: 0px 1px 0px rgba(255,255,255,.5); /* 50% white from bottom */; color: darkgoldenrod; font-size: 7vw //background-color: rgba(0,0,0,0.2); border-radius: 100px; padding: 5%; text-shadow: 0px 1px 0px rgba(255,255,255,.5); /* 50% white from bottom */; color: darkgoldenrod; font-size: 2vw
</script>

<style scoped>
    #SingleGalleryArea {
        background-image: url("../../assets/images/BackgroundB.png");
        background-size: 20%;
        background-repeat: repeat;
    }
    #GallerySolo {

        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding-bottom: 4%;
    }
    @import url("https://fonts.googleapis.com/css?family=Inconsolata|Merriweather");
    body {
        font-family: "Inconsolata", monospace;
        margin: 0;
    }

    button {
        cursor: pointer;
    }

    #portfolio {
        width: 80%;
        min-height: 100vh;
        //background: #ffffff;
        position: relative;
        display: flex;
       flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,0.3);
        border-radius: 50px;

    }

    .project {
        width: 23vw;
        height: 23vw;
        margin: 1vw;
        position: relative;
        //background: #F2DAD7;

        overflow: hidden;
        background-size: 130%;
        background-position: center;
        background-repeat: no-repeat;
    }
    .project img {
            position: absolute;
        opacity: 0.9;
    }
    .project p {
        position: absolute;
        text-align: center;
        width: 100%;
        padding: 1em 0;
        text-transform: uppercase;
        letter-spacing: 2px;
        z-index: 3;
    }
    .project .grid__title {
        position: absolute;
        width: 100%;
        text-align: center;
        white-space: nowrap;
        bottom: 0;
        font-weight: 100;
        font-size: 0.8em;
        z-index: 3;
        text-transform: uppercase;
        color: #474545;
        letter-spacing: 2px;
    }

    .project:hover .grid__overlay {
        transform: translateY(0%);
    }

    .grid__overlay {
        background: rgba(64, 38, 52, 0.9);
        height: 100%;
        grid-column: 1 / -1;
        grid-row: 1 / -1;
        position: relative;
        display: grid;
        justify-items: center;
        align-items: center;
        transform: translateY(101%);
        transition: all 0.3s ease-in-out;
    }
    .grid__overlay button {
        background: none;
        outline: none;
        font-weight: 100;
        letter-spacing: 2px;
        border: 1px solid #ffffff;
        color: #ffffff;
        text-transform: uppercase;
        padding: 10px;
    }
    .grid__overlay button:hover {
        transition: all 0.3s ease-in-out;
        background: #ffffff;
        color: #D1A39E;
        transform: scale(1.05);
    }

    .overlay {
        position: fixed;
        background: rgba(71, 69, 69, 0.7);
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: none;
        z-index: 3;
        align-items: center;
        justify-items: center;
    }


    .overlay__inner {
        background: #ffffff;
        width: auto;
        padding: 20px;
        position: relative;
        opacity: 1;
    }

    .close {
        position: absolute;
        top: 3px;
        right: 10px;
        background: none;
        outline: 0;
        color: #474545;
        border: 0;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    .close:hover {
        color: #D1A39E;
    }

    .project__image {
        margin-left: -50%;
    }

    #TopArea {

        background-position: center;
        background-size: 110%;
        filter: grayscale(100%);
        max-width: 70vw; display: inline-block; padding: 2vw 4vw 4vw 4vw; margin-bottom: 5vw; border-radius: 100px;
        transition: 1s;
    }
    #TopArea:hover {
        filter: grayscale(0%);
        background-size: 100%;
    }
    #TopArea:hover #TopText {
        background-color: rgba(0,0,0,0.0);
    }
    #TopText {
        background-color: rgba(0,0,0,0.4);
        padding: 1vw;
        border-radius: 100px;
        transition: 1s;
    }

    .backdrop {

        margin: auto;
        width: 75vw;
    }

    #GalleryTitle {
        color: white;
        font: bolder 12vw "Alfa Slab One";
        text-align: center;
        margin: 0;
        font-size: 7vw;


    }
    #GalleryDescription {
        color: white;
        font-size: 1.3vw;
        padding: 1% 20%;
        margin: 1% 0 4% 0;
        background-color: tomato;
    }

    @keyframes glow {
        0% {
            text-shadow: 0 0 10px white;
        }

        15% {
            text-shadow: 2px 2px 10px rgba(255, 255, 255, 1),
            -2px -2px 10px rgba(255, 255, 255, 1);
        }
        30% {
            text-shadow: 2px 2px 4px rgba(255, 255, 255, .7),
            -2px -2px 4px rgba(255, 255, 255, .7);
        }
        50% {
            text-shadow: 20px 20px 50px rgba(255, 255, 255, .5),
            -20px -20px 50px rgba(255, 255, 255, .5);
        }
    }



    #ButtonBoi {
        position: absolute;
        left: -2%;
        top: 5%;
        margin: 0 1vw 1vw 5vw;
        display: grid;
        grid-template-rows: 50% 50%;
        width: 6vw;
        cursor: pointer;
    }
    #ExitCar {
        width: 6vw;
        transition: 1s;
    }
    #ButtonBoi:hover #ExitCar {
        transform: translateX(-4vw) rotate(10deg);
    }
    #BackButton {
        transform: translateY(-2.7vh);
        width: 6vw;
        text-align: center;
    }
    .Button1:hover {
        background-color: #4CAF50;
        color: white;
        cursor: pointer;
        transform: scale(1.1);
    }
    .Button1 {
        font-size: 16px;
        margin: 4px 2px;
        transition-duration: 0.4s;
        background-color: rgba(100,200,50,0.8);
        border: initial;
    }

</style>