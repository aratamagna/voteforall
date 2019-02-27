<template>
  <div>
    <Header />
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
    Pregunta: {{showQuestion.question}}
    <br>
    Descripción: {{showQuestion.description}}
  </div>
  <button type=button class="btn btn-primary"  @click="clickMethod(showQuestion)">Votar</button>

    <router-link to="dashboard">Volver al Dash</router-link>
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
      items: [],
      showQuestion: {
        question: '',
        description: ''

      }
    }
  },components:{
    Header
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
    },clickMethod(objQuestion) {
      var vote = {};
      console.log("Se voto la pregunta..");
        if(confirm(objQuestion.question)) {
          vote = {
            questionId: objQuestion._id,
            question: objQuestion,
            answer: true
          }
        } else {
          vote = {
            questionId: objQuestion._id,
            question: objQuestion,
            answer: false
          }
        }
        axios.post('http://localhost:3000/answer', vote, config).then(function (r){
        if (r.status==200){
          console.log(r)
        } else {}
        })
    }
  },
  mounted() {
    this.listQuestions();
  }
}
</script>
