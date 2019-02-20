<template>
  <div>
  <ul id="example-1">
    <li v-for="item in items" @click="getQuestion(item._id)">
      {{ item.question }}
    </li>
    -----------------
    <!-- <li v-for="item in items">
      <router-link name="getQuestion", params: { userId: item._id }>{{ item.question }}</router-link>
    </li> -->
  </ul>
  <div>
    {{showQuestion.question}}
    {{showQuestion.description}}
  </div>
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
      items: [],
      showQuestion: {
        question: '',
        description: ''

      }
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
    },
    getQuestion (id) {
      console.log(id)
      var self = this;
        axios.get('http://localhost:3000/question/'+id, config).then(function (r){
          console.log('status:'+r.status+' data:'+r.data);
        if (r.status==200){
          console.log(r);
          self.showQuestion = r.data;
        } else {}
        })
    }
  },
  mounted() {
    this.listQuestions();
  }
}
</script>
