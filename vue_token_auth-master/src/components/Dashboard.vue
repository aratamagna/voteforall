<template>
  <div>
    <Header />

    <h2>Dashboard</h2>
    <p>Yay you made it {{user.username}}!</p>

    <router-link to="question">Preguntas disponibles</router-link>
    -
    <router-link to="ask">Crea tu propia pregunta</router-link>
  </div>
</template>

<script>
import auth from '../router/auth'
import Header from './Header.vue'
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
        username: '',
        email: ''
      }
    }
  },components:{
    Header
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
