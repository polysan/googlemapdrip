<template>
  <div>
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
        :position="{
          lat: Latitude,
          lng: Longitude
        }"
      />
    </GmapMap>
  </div>
</template>
<script>
export default {
  name: "MapSearch",
  data() {
    return {
      Latitude: 0,
      Longitude: 0
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // Geolocation APIに対応しているか確認
      if (navigator.geolocation) {
        // 現在地を取得
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
        // Geolocation APIに対応していない
      } else {
        alert("この端末では位置情報が取得できません");
      }
    }
  }
};
</script>
