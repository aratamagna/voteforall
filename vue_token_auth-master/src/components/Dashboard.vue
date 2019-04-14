<template>
  <div>
    <Header />
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <b-alert show>Tus Preguntas</b-alert>
          <div class="card" v-for="item in questionItems" :key="item.id" >
            <div class="card-body">
              <h5 class="card-title"><b-link :to="'question/'+item._id">{{item.question}}</b-link></h5>
              <h6 class="card-subtitle mb-2 text-muted">
              {{item.iniDate}}
              </h6>
            </div>
          </div>
        </b-col>
        <b-col>
          <b-alert variant="success" show>Tus respuestas</b-alert>
          <b-list-group v-for="item in answerItems" :key="item.id">
            <b-list-group-item v-if="item.answer" variant="success">{{item.question.question}}{{item.question.iniDate}}</b-list-group-item>
            <b-list-group-item v-else variant="danger">{{item.question.question}}{{item.question.iniDate}}</b-list-group-item>
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
      answer: '',
      question: '',
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
      } else {}
      })
    },
    selfQuestions () {
      var self = this;
      axios.get(process.env.HOST_URL+'/self/question', config).then(function (r){
        if (r.status==200){
          self.questionItems = r.data;
        } else {}
      })
    },
    selfAnswers () {
      var self = this;
      axios.get(process.env.HOST_URL+'/self/answer', config).then(function (r){
        if (r.status==200){
        console.log(r)
          self.answerItems = r.data;
        } else {}
      })
    }
  },
  mounted(){
    this.self();
    this.selfQuestions();
    this.selfAnswers();
  }
}
</script>
