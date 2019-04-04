<template>

  <div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">Vote4All</b-navbar-brand>

    <b-navbar-toggle target="nav_collapse" />

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item><b-link :to="'/question'">Preguntas disponibles</b-link></b-nav-item>
        <b-nav-item><b-link :to="'/ask'">Crea tu propia pregunta</b-link></b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Buscar" />
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Buscar</b-button>
        </b-nav-form>

        <!--b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown-->

        <b-nav-form right>
          <b-nav-item href="ask">{{user.username}}</b-nav-item>
          <b-link :to="'/logout'">Logout</b-link>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import auth from '../router/auth'

const axios = require('axios');
let config = {
    headers: {
      'Authorization': 'Bearer ' + auth.getToken()
    }
  }

export default {
  data () {
    return {
      user: {
        username: ''
      }
    }
  },
  methods: {
    self () {
      var s = this;
      axios.get(process.env.HOST_URL+'/user/self', config).then(function (r){
      if (r.status==200){
        s.user = r.data;
        console.log(r)
      } else {}
      })
    }
  },
  mounted(){
    this.self();
  }
}
</script>
