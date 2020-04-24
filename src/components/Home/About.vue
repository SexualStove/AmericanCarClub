<template>
  <div id="capsule">
    <div id="MainWindow">
      <div id="review">
        <div id="reviewText">
          <div id="reviewQuote">
            "Crispy chips and amazing fish, 10/10 would go again"
          </div>
          <div id="reviewAuthor"> - Troy Jacobs </div>
        </div>
      </div>
      <div id="L-BLOCK"></div>
      <div id="R-BLOCK"></div>
      <div id="about">
        <div id="aboutTitle">
          What makes up us?
        </div>
        <div id="aboutDescription">
          our fishery has been feeding the village for over 20 years and has built a
          reputation in for quality food. We have a full and varied menu with something to suit the whole family.
          We go the extra mile to deliver consistent quality food using the best ingredients cooked by
          experienced chefs. We pride ourselves on service with a smile, we aim to make every local suburb
          Fishery experience a good one.
        </div>

      </div>
      <div id="info">
        <b>Location</b><br>
        53  Gow Place<br>
        South New Brighton, 8062
        <br>
        <br>
        <b>Phone</b><br>
        (029) 6305-482
        <br>
        <br>
        <b>Email</b><br>
        iohhy6lia4n@fakemailgenerator.net
        <br>
        <br>
        <b>Hours</b><br>
        Mon - Closed<br>
        Tue - 9am-8pm<br>
        Wens - 9am-8pm<br>
        Thurs - 9am-8pm<br>
        Fri - 9am-10pm<br>
        Sat - 9am-10pm<br>
        Sun - Closed<br>
      </div>
      <div id="picture"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "About"
    }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400&display=swap');
#capsule {
  width: 100vw;
  max-width: 100%;
  height: 100vh;
}
#MainWindow {
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-rows: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
  grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
  grid-template-areas:
    "L-BLOCK L-BLOCK review review review review info info R-BLOCK R-BLOCK"
    "L-BLOCK L-BLOCK review review review review info info R-BLOCK R-BLOCK"
    "L-BLOCK L-BLOCK about about about about info info R-BLOCK R-BLOCK"
    "L-BLOCK L-BLOCK about about about about info info R-BLOCK R-BLOCK"
    "L-BLOCK L-BLOCK about about about about info info R-BLOCK R-BLOCK"
    "L-BLOCK L-BLOCK about about about about info info R-BLOCK R-BLOCK"
    "L-BLOCK L-BLOCK about about about about info info R-BLOCK R-BLOCK"
    "L-BLOCK L-BLOCK picture picture picture picture picture picture R-BLOCK R-BLOCK"
    "L-BLOCK L-BLOCK picture picture picture picture picture picture R-BLOCK R-BLOCK"
    "L-BLOCK L-BLOCK picture picture picture picture picture picture R-BLOCK R-BLOCK";
}
#review {
  grid-area: review;
  font-family: 'Amatic SC', cursive;
  font-size: 2vw;
  width: 40vw;
  display: flex;
  justify-content: center;
  align-items: center;

}
#reviewQuote {
  vertical-align: center;
  text-align: center;
  display: block;
}
#L-BLOCK {
  grid-area: L-BLOCK;
  background-color: cornflowerblue;
}
#R-BLOCK {
  grid-area: R-BLOCK;
  background-color: olive;
}
#about {
  grid-area: about;
  background-color: crimson;

}
#aboutDescription {
  font-family: 'Oswald', sans-serif;
  font-size: 1.4vw;
  font-weight: 200;
  text-align: left;
}
#aboutTitle {
  font-family: 'Oswald', sans-serif;
  font-size: 1.6vw;
  font-weight: 200;
  text-align: left;
  padding-bottom: 10%;
}
#info {
  grid-area: info;
  background-color: coral;
}
#picture {
  grid-area: picture;
  background-color: slategray;
  background-image: url("../../assets/images/Storefront.jpg");
  background-size: cover;
  background-position: 0 -20vh;
}
</style>