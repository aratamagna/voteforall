<template>
  <!--div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>Tus Respuestas
        </b-col>
        <b-col>Hola
          <p>{{user.username}}!</p>
          <b-button  href="logout" variant="outline-danger">Logout</b-button>
          <p><router-link to="logout">Logout</router-link></p>
        </b-col>
      </b-row>
    </b-container>

  </div-->
  <div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">Vote4All</b-navbar-brand>

    <b-navbar-toggle target="nav_collapse" />

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="question">Preguntas disponibles</b-nav-item>
        <b-nav-item href="ask">Crea tu propia pregunta</b-nav-item>
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

        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content"><em>{{user.username}}</em></template>
          <!--b-dropdown-item href="#">Profile</b-dropdown-item-->
          <b-dropdown-item href="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
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
      axios.get('http://localhost:3000/user/self', config).then(function (r){
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
