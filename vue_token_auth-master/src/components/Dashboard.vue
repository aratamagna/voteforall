<template>
  <div>
    <h2>Dashboard</h2>
    <p>Yay you made it {{user.username}}!</p>
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
        username: '',
        email: ''
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
