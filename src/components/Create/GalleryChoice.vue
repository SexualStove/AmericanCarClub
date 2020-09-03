<template>
  <div id="Flex">
    <div id="Create">
      <transition name="Opacity">
       <div v-if="this.Created === false" class="SideTitle">Create Gallery</div>
      </transition>
      <transition name="Opacity">
        <CreateGallery v-if="Created"></CreateGallery>
      </transition>
    </div>
    <div id="Destroy">
      <transition name="Opacity">
      <div v-if="!this.Destoryed" class="SideTitle">Destroy Gallery</div>
      </transition>
      <transition name="Opacity">
        <RemoveGallerys v-if="Destoryed"></RemoveGallerys>
      </transition>
    </div>
  </div>
</template>

<script>
    import JQuery from 'jquery';
    import RemoveGallerys from "./RemoveGallerys";
    import CreateGallery from "./CreateGallery"
    let $ = JQuery;


    export default {
        components: {RemoveGallerys, CreateGallery},
        data() {

            return {
              Created: false,
              Destoryed: false,
            }
        },

        methods: {
        },
        beforeMount() {
        },

        computed: {

        },
        mounted() {
            let self = this;
            $("#Create").on({

                click: function () {
                    if(!self.Created) {
                        self.Created = true;
                        self.Destoryed = false;
                        $("#Create").css({"width": "90%"});
                        $("#Destroy").css({"width": "10%", "font-size": "2rem"});
                    }
                },
            });
            $("#Destroy").on({
                click: function () {
                    if(!self.Destoryed) {
                        self.Destoryed = true;
                        self.Created = false;
                        $("#Destroy").css({"width": "90%"});
                        $("#Create").css({"width": "10%", "font-size": "2rem"});
                    }
                },
            });
        }
    }
</script>

<style scoped>
#Flex {
  display: flex;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
}
#Create {
  position: relative;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;

  transition: 1s;
  width: 50%;
  height: 100%;
  background-color: greenyellow;
  font-size: 5rem;
}
.SideTitle {
  font-family: 'Roboto', sans-serif;
  //transition: 1s;
  color: #333;
}

#Destroy {
  position: relative;
  font-size: 5rem;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  transition: 1s;
  background-color: orangered;
  width: 50%;
  height: 100%;
}
.Opacity-enter-active, .Opacity-leave-active {
  transition: 1.5s;
}
.fOpacity-enter, .Opacity-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  position: absolute;
  transform: scale(0.2);
}
</style>