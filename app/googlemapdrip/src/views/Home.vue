<template>
  <div class="home">
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
                <i class="dot circle link icon" @click="initMap"></i>
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
                <div class="meta">{{ place.vicinity }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ten wide column segment ui" ref="map">
        <GmapMap
          :center="{
            lat: Latitude,
            lng: Longitude
          }"
          :zoom="15"
          map-type-id="terrain"
          style="width: 600px; height: 500px"
        >
          <GmapInfoWindow
            :options="infoOptions"
            :position="infoWindowPos"
            :opened="infoWinOpen"
            @closeclick="infoWinOpen = false"
          >
          </GmapInfoWindow>
          <GmapMarker
            :key="marker.place_id"
            v-for="marker in markers"
            :position="marker.geometry.location"
            :title="marker.title"
            :clickable="true"
            :draggable="false"
            @click="centerMarker(marker.geometry.location, marker)"
          >
          </GmapMarker>
        </GmapMap>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      type: "",
      radius: "",
      places: [],
      Latitude: 0,
      Longitude: 0,
      markers: [],
      address: "",
      infoOptions: {
        content: "",
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      infoWindowPos: null,
      infoWinOpen: false
    };
  },
  mounted() {
    this.initMap();
  },
  computed: {
    coordinates() {
      return `${this.Latitude}, ${this.Longitude}`;
    }
  },
  methods: {
    findCloseBuyButtonPressed() {
      const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=
      ${this.Latitude},${this.Longitude}&type=${this.type}&radius=${this
        .radius * 1000}&key=AIzaSyBwjj6oaXdQVbFU_V8Vq1jEAjKHYKhr2xk`;
      this.$axios
        .get(URL)
        .then(response => {
          this.places = response.data.results;
          console.log(response.data.results);
          this.markers = this.places;
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    initMap() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            this.Latitude = position.coords.latitude;
            this.Longitude = position.coords.longitude;
          }.bind(this),
          // 取得失敗した場合
          function(error) {
            // エラーメッセージを表示
            switch (error.code) {
              case 1: // PERMISSION_DENIED
                alert("位置情報の利用が許可されていません");
                break;
              case 2: // POSITION_UNAVAILABLE
                alert("現在位置が取得できませんでした");
                break;
              case 3: // TIMEOUT
                alert("タイムアウトになりました");
                break;
              default:
                alert("その他のエラー(エラーコード:" + error + ")");
                break;
            }
          }
        );
      } else {
        alert("この端末では位置情報が取得できません");
      }
    },
    centerMarker(location, marker) {
      this.Latitude = location.lat;
      this.Longitude = location.lng;
      this.infoWindowPos = location;
      this.infoWinOpen = true;
      this.infoOptions.content = `<div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img src="https://maps.googleapis.com/maps/api/place/photo?maxheight=200&maxwidth=200&photoreference=${
        marker.photos[0].photo_reference
      }&key=AIzaSyBwjj6oaXdQVbFU_V8Vq1jEAjKHYKhr2xk" alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4">${marker.name}</p>
      </div>
    </div>
    <div class="content">
      ${this.returnOpenhour(marker.opening_hours.open_now)}
      <br>
      <time datetime="2016-1-1">評価 ${marker.rating}</time>
    </div>
  </div>
</div>`;
    },
    returnOpenhour(hourBoolean) {
      if (hourBoolean === true) {
        return "営業中";
      } else {
        return "営業時間外";
      }
    }
  }
};
</script>
