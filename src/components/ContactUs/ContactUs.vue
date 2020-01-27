<template>
    <div id="ContactUsPage">


        <div>

            <form id="form" class="topBefore"  @submit.prevent="sendEmail" >
                <input class="input" name ="user_name" type="text" placeholder="NAME">
                <input class="input" name="user_email" type="text" placeholder="E-MAIL">
                <input class="input" name="company" type="text" placeholder="COMPANY">
                <input class="input" name="phone" type="text" placeholder="CONTACT NO">
                <textarea name="message" type="text" placeholder="MESSAGE"></textarea>
                <input id="Submit" type="submit" class="button" value="Submit">

            </form>
        </div>
    </div>
</template>

<script>
    import emailjs from "emailjs-com";

    export default {

        data() {
            return {
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

        }
    }
</script>

<style scoped>

</style>