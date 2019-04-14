<template>
  <div>

    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Vote4All</b-navbar-brand>

      <b-navbar-toggle target="nav_collapse" />

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item href="question" disabled>Preguntas disponibles</b-nav-item>
          <b-nav-item href="ask" disabled>Crea tu propia pregunta</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-form class="ml-auto" @submit.prevent="login">
            <!-- Using button-content slot >
            <template slot="button-content"><em>{{user.username}}</em></template-->
            <!--b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="logout">Logout</b-dropdown-item-->
            <b-input-group>
              <b-form-input v-model="email" class="" type="text" placeholder="Usuario" />
              <b-form-input v-model="pass" class="" type="password" placeholder="Contraseña"/>
              <b-button size="sm" class="" type="submit" variant="success">Login</b-button>
            </b-input-group>
            <b-button class="ml-2" type="button" to="/singin" variant="primary">Registrarme</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <p v-if="$route.query.redirect">
      You need to login first.
    </p>
    <Home/>
  </div>
</template>

<script>
import auth from '../router/auth'
var SHA256 = require("crypto-js/sha256");

import Home from "./Home.vue"

export default {
  data () {
    return {
      email: '',
      pass: '',
      error: false
    }
  },
  methods: {
    login () {
      var passInSHA256 = SHA256(this.pass).toString();
      auth.login(this.email, passInSHA256, loggedIn => {
        console.log('loggedIn:'+loggedIn)
        if (!loggedIn) {
          console.log("Login fail")
          this.error = true
        } else {
          console.log("Login succe")
          this.$router.replace(this.$route.query.redirect || '/dashboard')
        }
      })
    }
  },components:{
    Home
  }
}
</script>

<style>
.error {
  color: red;
}
</style>
