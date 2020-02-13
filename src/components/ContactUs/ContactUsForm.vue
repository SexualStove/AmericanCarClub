<template>
    <div id="ContactUsPage">

        <ContactDetails id="Left" class="ContactDetails" style="display: inline-block">
        </ContactDetails>

        <div id="Right" class="form" style="display: inline-block">
            <span class="ContactUsTitle">Contact Us</span>
            <form id="form" class="topBefore"  @submit.prevent="sendEmail" >
                <div><input class="input" name ="user_name" type="text" placeholder="  NAME"></div>
                <div><input class="input" name="user_email" type="text" placeholder="  E-MAIL"></div>
                <div><input class="input" name="company" type="text" placeholder="  COMPANY"></div>
                <div><input class="input" name="phone" type="text" placeholder="  CONTACT NO"></div>
                <div><textarea class="input" name="message" type="text" placeholder=" MESSAGE"></textarea></div>
                <div><input id="Submit" type="submit" class="button" value="Submit"></div>

            </form>
        </div>

    </div>





</template>

<script>
    import emailjs from "emailjs-com";
    import ContactDetails from "./ContactDetails";
    import {  TimelineMax, Back } from "gsap"
    export default {
        components: {ContactDetails},
        data() {
            return {
                Played: false,
            }
        },
        methods: {
            sendEmail: function (e){
                console.log(e.target);
                emailjs.sendForm('outlook', 'template_Uw0MXK3o', e.target, 'user_uOprWSk6Oex46gljAzERQ')
                    // eslint-disable-next-line no-unused-vars
                    .then((response) => {
                        // eslint-disable-next-line no-undef
                        console.log('SUCCESS!', response.status, response.text);
                    }, (error) => {
                        console.log('FAILED...', error);
                    });

            },

        },

        computed: {

        },
        mounted() {
            let self = this;
            this.$nextTick(function(){
                window.addEventListener("scroll", function() {
                    console.log(document.documentElement.scrollTop);
                    if (document.documentElement.scrollTop >= 550) {
                        if(self.Played === false) {
                            var LogoStringTimeline = new TimelineMax({});
                            LogoStringTimeline.to("#Submit", 0.1, {opacity: 1}).to(
                              "#Right", 1, {opacity: 1, x: 0, ease: Back.easeOut.config(0.2)}).to(
                              "#Left",1, {opacity: 1, x: 0, ease: Back.easeOut.config(0.2)}
                            );
                            self.Played = true
                        }

                    }
                })
            });

        }
    }
</script>

<style scoped>

    #ContactUsPage{

        background-color: #30011E;
        display: grid;
        grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
        grid-template-rows: auto;
        grid-template-areas:
            ". . . . . . . . . ."
            ". detail detail detail . form form form . ."
            ". detail detail detail . form form form . ."
            ". detail detail detail . form form form . ."
            ". . . . . . . . . .";
        padding-bottom: 5%;
    }


    .form{
        position: relative;
        grid-area: form;

    }
    .form .input{
        position: relative;
        width: 80%;
        height: 50px;
        margin: 5px;

    }
    .ContactUsTitle{
        font-family: 'Cinzel', serif;
        font-size: 65px;
        font-style: oblique;
        color: #D7CDCC;
    }
    .ContactDetails{
        grid-area: detail;
    }
    #Left {
        color: white;
        transform: translateX(-2000px);
        opacity: 0;
    }
    #Right {
        transform: translateX(2000px);
        opacity: 0;
    }
    @media (max-width: 800px) {
        #ContactUsPage{
            display: block;
        }

    }

</style>