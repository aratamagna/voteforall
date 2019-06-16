<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  margin-top: 0px;
}
.bg-primary {
  background-color: rgba(17, 51, 83, 0.02) !important;
}
.btn-danger {
    color: #fff;
    background-color: rgba(220, 53, 69, 0.85) !important;
    border-color: #dc3545;
}
btn-success {
    color: #fff;
    background-color: rgba(40, 167, 69, 0.85) !important;
    border-color: #28a745;
}
.bg-danger {
    background-color: rgba(220, 53, 69, 0.85) !important;
}
.bg-success {
    background-color: rgba(40, 167, 69, 0.85) !important;
}
.welcome-box {
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    height: auto;
    min-height: 80px;
    background-color: rgba(17, 51, 83, 0.02);
    color: rgba(17, 51, 83, 0.6);
    box-shadow: rgba(17, 51, 83, 0.02) 0px 4px 12px 0px;
    text-align: initial;
    padding: 20px;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    border-radius: 4px;
    box-sizing: inherit;
}
.gppOwl {
    display: flex;
    flex-direction: column;
    padding-right: 18px;
    flex: 1 1 auto;
}
.hhDDMc {
    display: flex;
    flex-direction: row;
    margin-right: 18px;
    box-sizing: inherit;
    float:left;
}
.fndDuH {
    width: 42px;
    height: 42px;
}
.fYIFUv {
    margin-bottom: 4px;
    font-size: 18px;
    font-weight: 500;
}
</style>
