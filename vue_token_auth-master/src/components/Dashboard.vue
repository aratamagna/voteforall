<template>
  <div>
    <Header />
    <p>Yay you made it {{user.username}}!</p>

    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <b-alert show>Tus Preguntas</b-alert>
          <b-list-group v-for='item in questionItems'>
            <b-list-group-item >{{item.question}}</b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col>
          <b-alert variant="success" show>Tus respuestas</b-alert>
          <b-list-group v-for='item in answerItems'>
            <b-list-group-item >{{item.question}}</b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>
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
      questionItems: [],
      answerItems: [],
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
    },
    selfQuestions () {
      var self = this;
      axios.get(process.env.HOST_URL+'/self/question', config).then(function (r){
        if (r.status==200){
          self.questionItems = r.data;
          console.log(r)
        } else {}
      })
    }
  },
  mounted(){
    this.self();
    this.selfQuestions();
  }
}
</script>
