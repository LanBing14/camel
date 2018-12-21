<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
.publiColor {
  color: #ff7f01;
  font-size: 14px;
}
#app {
  height: 100%;
  color: #333;
  max-width: 750px;
  margin: 0 auto;
}
.mint-header {
  background: #fff;
  color: #ff7f01;
  font-size: 16px;
  height: 1.8rem;
  z-index: 998;
}
</style>
