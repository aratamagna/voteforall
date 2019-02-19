<template>
  <div>
  <ul id="example-1">
    <li v-for="item in items">
      {{ item.question }}
    </li>
  </ul>
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
      items: []
    }
  },
  methods: {
    listQuestions () {
    var self = this;
      axios.get('http://localhost:3000/question', config).then(function (r){
      if (r.status==200){
        console.log(r);
        self.items = r.data;
      } else {}
      })
    }
  },
  mounted() {
    this.listQuestions();
  }
}
</script>
