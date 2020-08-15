<template>
  <div>
    <h2>Your Address</h2>

    <vue-google-autocomplete
      ref="address"
      id="map"
      classname="form-control"
      placeholder="Please type your address"
      v-on:placechanged="getAddressData"
      country="sg"
    >
    </vue-google-autocomplete>
    <!-- lat=北緯 lng=東経 -->
    <GmapMap
      :center="{
        lat: Latitude,
        lng: Longitude
      }"
      :zoom="15"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        v-for="m in makers"
        :position="m.position"
        :title="m.title"
        :clickable="true"
        :draggable="false"
        :icon="m.icon"
        :key="m.id"
      >
      </GmapMarker>
    </GmapMap>
  </div>
</template>
<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
export default {
  components: {
    VueGoogleAutocomplete
  },
  name: "MapSearch",
  data() {
    return {
      Latitude: 0,
      Longitude: 0,
      makers: [],
      address: ""
    };
  },
  async mounted() {
    this.initMap();
    this.$refs.address.focus();
  },
  methods: {
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
    /**
     * When the location found
     * @param {Object} addressData Data of the found location
     * @param {Object} placeResultData PlaceResult object
     * @param {String} id Input container ID
     */
    getAddressData: function(addressData) {
      this.address = addressData;
    }
  }
};
</script>
