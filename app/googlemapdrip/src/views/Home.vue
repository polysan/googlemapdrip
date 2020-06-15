<template>
  <div class="home">
    <MapSearch />
  </div>
</template>

<script>
// @ is an alias to /src
import MapSearch from "@/components/MapSearch.vue";
export default {
  name: "Home",
  components: {
    MapSearch
  }
};
</script>
