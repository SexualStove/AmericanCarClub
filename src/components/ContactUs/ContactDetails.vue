<template>
    <div id="ContactDetails">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

        <div class="po">
            <i class="fa fa-envelope-square" aria-hidden="true" ></i>
            <b>The American Classic Car Club (Canterbury) Inc</b> <br>
            PO Box 758  <br>
            Christchurch 8140 <br>
            New Zealand <br>
        </div>
        <hr>

        <div class="banking">
            <b>Bank Account</b> <br>
            <i class="fa fa-university" aria-hidden="true"></i>
            <b>02-0865-0415870-00</b> <br><br>
            <i>Please include your name as a reference</i>
        </div>
        <hr>
        <div class="people">
            <div class="buttons">
                <button id="headButton" v-on:click="setHeads" style="margin-right: 5%; background-color: #dadbe0; border-style: inset">Club Heads</button>
                <button id="memberButton" v-on:click="setMembers" style="margin-left: 5%; background-color: white">Committee Members</button>
            </div>
            <div v-if="currentChosen === 'Heads'" >
                <div v-for="head in clubHeads" v-bind:key="head.name" style="display: inline-block" id="heads">
                    <b>{{head.name}}</b><br><br>
                    <i>{{head.position}}</i><br><br>
                    {{head.number}}
                </div>
            </div>
            <div v-if="currentChosen === 'Members'" class="contacts">
                <div v-for="member in committeeMembers" v-bind:key="member" style="display: inline-block" id="members">
                    <b>{{member}}</b>
                </div>
            </div>
        </div>

    </div>
</template>

<script>


    export default {

        data() {
            return {
                currentChosen:"Heads",
                clubHeads:[
                    {
                        "position": "President",
                        "name": "Bill Stanley",
                        "number": "027 282 4244"
                    },
                    {
                        "position": "Vice President",
                        "name": "Murray Marshall",
                        "number": " 027 200 1350"
                    },
                    {
                        "position": "Secretary/Treasurer",
                        "name": "Jimmi Anderson",
                        "number": "021 237 9637"
                    },
                    {
                        "position": "Club Captain",
                        "name": "Ray Bewley",
                        "number": "-"
                    },
                ],
                committeeMembers:[
                    "Cathy Martin",
                    "Tony Condon",
                    "Sam Ng",
                    "Melissa Parker",
                    "Margaret Stanley"
                ]
            }
        },
        methods: {
            setHeads: function() {
                this.currentChosen = "Heads";
                document.getElementById("headButton").style.backgroundColor="#dadbe0";
                document.getElementById("headButton").style.borderStyle="inset";
                document.getElementById("memberButton").style.backgroundColor="white";
                document.getElementById("memberButton").style.borderStyle="outset";
            },
            setMembers: function(){
                this.currentChosen = "Members";
                document.getElementById("headButton").style.backgroundColor="white";
                document.getElementById("headButton").style.borderStyle="outset";
                document.getElementById("memberButton").style.backgroundColor="#dadbe0";
                document.getElementById("memberButton").style.borderStyle="inset";

            }

        },

        computed: {

        },
        mounted() {

        }
    }
</script>

<style scoped>
    #ContactDetails{
        position: relative;
        display: grid;
        grid-template:
        ". . ."
        "po po po"
        "bank bank bank"
        "people people people"
        ". . .";
        margin-top: 10%;
        color: #D7CDCC;
        font-family: 'Roboto', sans-serif;
    }
    .fa-envelope-square{
        font-size: xx-large;
        text-indent: -1em;
    }
    .po{
        grid-area: po;
        /*background-color: blue;*/
        text-align: left;
        text-indent: -0em;
        margin-bottom: 5%;

    }
    .fa-university{
        font-size: xx-large;
        text-indent: -1.2em;
    }
    .banking{
        grid-area: banking;
        /*background-color: green;*/
        text-align: left;
        text-indent: -0em;
        margin-bottom: 5%;
        margin-top: 5%;
    }
    .people{
        margin-top: 5%;
        grid-area: people;
        /*background-color: red;*/
    }
    #heads{
        margin-right: 2.5%;
        margin-left: 2.5%;
        margin-top: 5%;
    }
    #members{
        margin-left: 1.5%;
        margin-right: 1.5%;
        margin-top: 4.5%;
    }
    #headButton{
        border-radius: 50px;
    }
    #memberButton{
        border-radius: 50px;
    }
    .buttons button{
        cursor: pointer;
    }
    .buttons button:focus{
        outline: none;
    }
</style>