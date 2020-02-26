<template>
    <div id="GallerySolo">
        <div >
            <div id="BlackBackground"></div>

            <div style="padding-top: 2%; position: relative">
                <div id="ButtonBoi" v-on:click="BackOut()">
                    <img id="ExitCar" src="../../assets/images/ExitCar.png" alt="None">
                    <h3 id="BackButton">Back!</h3>
                </div>
                <h1 id="Title">{{GalleryVue.Title}}</h1>

                <img class="Thumbnail" v-bind:src="GalleryVue.Image" alt="None">
            </div>
            <div style="height: 5vw"></div>
            <div v-for="Image in FilteredList" v-bind:key="Image.id" class="GalleryImages" >
                <img v-on:click="FullSize"  class="ImageGallery" v-bind:src="Image.Image" alt="None">
            </div>
            <div class="close-container" v-if="this.FullSized && !this.FullSize">
                <div class="leftright"></div>
                <div class="rightleft"></div>
                <label id="Close" class="close">close</label>
            </div>

        </div>
    </div>
</template>

<script>
    import {EventBus} from "../../App";
    import JQuery from 'jquery';
    let $ = JQuery;
    export default {

        data() {
            return {
                myUrl: 'asdfb',
                blogContent: "",
                blogs: '',
                thumbnail: '',
                TotalBlogSize: 3,

                TransferBlogList: undefined,
                Reversed: false,
                FullSized: false,

            }
        },
        computed: {
            FilteredList() {
                return this.ImageTable.filter(x => parseInt(x.GalleryLink) === parseInt(this.GalleryVue.id));
            }
        },
        props: ['GalleryVue', 'ImageTable'],
        methods: {
          BackOut() {
                  EventBus.$emit('CurrentGallery', undefined);
            },

            FullSize() {

            }
        },
        mounted() {
            let self= this;
            $('.ImageGallery').click(function () {
                $('.active').not(this).addClass('non_active');
                $('.active').not(this).removeClass('active');
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
            })
        }
    }
</script>

<style scoped>
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
    #Title {
        font-size: 5vw;
        text-align: center;
        font-family: 'Cinzel', serif;
    }
    #AboutUsTitle {

        font-family: 'Cinzel', serif;
        font-size: 2.5vw;
        margin: 0% 15% 3% 1%;

    }

    #GallerySolo {
      color: #D7CDCC;
        width: 100vw;
        text-align: left;

    }
    #AboutUsContent {
        font-size: 1.2vw;
        font-weight: 300;
        margin: 3% 10% 3% 1%;
        font-family: 'Roboto', sans-serif;
    }
    .Thumbnail {
        width: 50vw;
        margin-left: 25vw;
    }
    .ImageGallery {
        display: inline-block;
        max-width: 20vw;
        cursor: pointer;
    }
    .ImageGallery:hover {
    }
    .GalleryImages {
        display: inline-block;
        max-width: 25vw;
        margin: 4vw 14.5vw 4vw 14.5vw;
        justify-content: center;
        align-content: center;

    }

    .active {
        z-index: 3;
        max-width: 70vw;
        max-height: 90vh;
        width: 200%;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        box-shadow:  0vw  0vw 100vw 100vw rgba(0,0,0,0.7);
    }
    img {
        max-height: 100%;
        max-width: 100%;
        box-shadow:
          -50px -50px 0 -40px tomato,
          50px 50px 0 -40px tomato;
    }

    .non_active {
        width: initial;
        height: initial;
    }
    #BlackBackground {
        width: 100vw;
        height: 100vh;
        top: 0;
        position: fixed;
        background-color: rgba(0, 0, 0, 0);
        z-index: -1;
    }



















    .close-container {
        position: fixed;
        right: 15%;
        width: 50px;
        height: 50px;
        z-index: 6;
        cursor: pointer;
        top: 6%;
    }
    .leftright {
        height: 4px;
        width: 50px;
        position: absolute;
        margin-top: 24px;
        background-color: #f4a259;
        border-radius: 2px;
        transform: rotate(45deg);
        transition: all 0.3s ease-in;
    }
    .rightleft {
        height: 4px;
        width: 50px;
        position: absolute;
        margin-top: 24px;
        background-color: #f4a259;
        border-radius: 2px;
        transform: rotate(-45deg);
        transition: all 0.3s ease-in;
    }
    #Close {
        color: white;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 0.6em;
        text-transform: uppercase;
        letter-spacing: 2px;
        transition: all 0.3s ease-in;
        opacity: 0;
    }
    .close {
        margin: 60px 0 0 5px;
        position: absolute;
    }
    .close-container:hover .leftright {
        transform: rotate(-45deg);
        background-color: #f25c66;
    }
    .close-container:hover .rightleft {
        transform: rotate(45deg);
        background-color: #f25c66;
    }
    .close-container:hover label {
        opacity: 1;
    }

</style>