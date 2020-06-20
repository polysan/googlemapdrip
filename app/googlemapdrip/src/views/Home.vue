<template>
  <div class="home">
    <MapSearch />
    <MapPlaces />
  </div>
</template>

<script>
// @ is an alias to /src
import MapSearch from "@/components/MapSearch.vue";
import MapPlaces from "@/components/MapPlaces.vue";
export default {
  name: "Home",
  components: {
    MapSearch,
    MapPlaces
  }
};
</script>
