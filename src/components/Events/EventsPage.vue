<template>
  <div id="EventsPage">
    <h1 id="EventsTitle"> Our Local Events</h1>
    <div class="EventItems" v-for="Event in EventData" v-bind:key="Event">

        <div class="Content" style="position: relative">
          <h1 class="Name"> {{Event.EventName}}</h1>
          <h3 class="Intro"> {{Event.ShortIntro}}</h3>
          <h4 class="Date"> {{Event.date}} </h4>
          <h4 class="Where"> {{Event.Where}} </h4>
          <h4 class="Time"> {{Event.time}} </h4>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "EventsPage",
        data: function () {
            return {
                EventData: [
                    {
                        'date': '20-01-2018',
                        'time': '3 am',
                        'EventName': 'USA DAY',
                        'ShortIntro': 'Our Car day we host once a year',
                        'Where': 'Woodend Rugby Club'
                    },
                    {
                        'date': '20-04-1018',
                        'time': '4:30 pm',
                        'EventName': 'Canterbury USA day',
                        'ShortIntro': 'Canterbury with USA day',
                        'Where': 'Woodend Rugby Club'
                    },
                    {
                        'date': '26-04-2016',
                        'time': '9 am',
                        'EventName': '2016 AGM',
                        'ShortIntro': 'The Foundry Bar',
                        'Where': 'Woodend Rugby Club'
                    },
                    {
                        'date': '16-07-2014',
                        'time': '12 am',
                        'EventName': 'Tuhoe Sailing (Kaiapoi) & BBQ',
                        'ShortIntro': 'Get ya Tuhoes for sailing and BBQ for drowning',
                        'Where': 'Kaiapoi'
                    }
                ]

            }
        }
    }
</script>

<style scoped>
  .EventItems {
    display: inline-block;
    vertical-align: top;


  }
  #EventsTitle {
    font-family: 'Cinzel', serif;
    font-size: 5vw;

  }
  .Intro {
    font-weight: 300;
  }
  .Date {
    position: absolute;
    top: 0;
    left: 5%;

    opacity: 0.5;
  }
  .Where {
    position: absolute;
    bottom: 5%;
    right: 5%;
    opacity: 0.5;
  }
  .Time {
    position: absolute;
    bottom: 5%;
    left: 5%;
    opacity: 0.5;
  }
  .Content {
    width: 15vw;
    padding: 2.5vw;
    margin: 5vw;
    height: 15vw;
    box-shadow: 5px 10px 8px 10px #888888;
    border-radius: 5%;
  }
  #EventsPage {
    height: 120%;
  }
</style>