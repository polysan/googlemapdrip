<template>
  <div class="ui grid">
    <div class="six wide column">
      <div class="ui segment large form">
        <div class="ui segment">
          <div class="field">
            <div class="ui right icon input large">
              <input
                type="text"
                placeholder="Enter your address"
                v-model="coordinates"
              />
              <i class="dot circle link icon" @click="locatorButtonPressed"></i>
            </div>
          </div>
          <div class="field">
            <div class="two fields">
              <div class="field">
                <select v-model="type">
                  <option value="restaurant">Restaurant</option>
                </select>
              </div>
              <div class="field">
                <select v-model="radius">
                  <option value="5">5 KM</option>
                  <option value="10">10 KM</option>
                  <option value="15">15 KM</option>
                  <option value="20">20 KM</option>
                </select>
              </div>
            </div>
          </div>
          <button class="ui button" @click="findCloseBuyButtonPressed">
            Find CloseBuy
          </button>
        </div>
      </div>
      <div class="ui segment" style="max-height:500px;overflow:scroll">
        <div class="ui divided items">
          <div class="item" v-for="place in places" :key="place.id">
            <div class="content">
              <div class="header">{{ place.name }}</div>
              <div class="meta">{{ place.rating }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ten wide column segment ui" ref="map"></div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "MapPlaces",
  data() {
    return {
      lat: 0,
      lng: 0,
      type: "",
      radius: "",
      places: []
    };
  },
  computed: {
    coordinates() {
      return `${this.lat}, ${this.lng}`;
    },
    findclose() {
      return `${this.ip}`;
    }
  },
  methods: {
    locatorButtonPressed() {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        },
        error => {
          console.log("Error getting location");
          console.log(error.message);
        }
      );
    },
    findCloseBuyButtonPressed() {
      this.$axios
        .get(
          "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBwjj6oaXdQVbFU_V8Vq1jEAjKHYKhr2xk"
        )
        .then(response => {
          this.places = response.data.candidates;
          console.log(this.places);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  }
};
</script>
