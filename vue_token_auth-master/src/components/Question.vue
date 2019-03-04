<template>
  <div>
    <Header />

    <b-container class="bv-example-row">
      <b-row>
        <b-col>Tus Respuestas
          <b-list-group>
            <b-list-group-item v-for="item in items" @click="getQuestion(item._id)">
              <b-button v-b-modal.modal1 variant="dark">{{ item.question }}{{getQuestionResults(item._id)}}</b-button>
              <b-progress class="mt-2" :max="max" show-value>
                <b-progress-bar :value="100*(6/10)" variant="success" />
                <b-progress-bar :value="80*(1.5/10)" variant="danger" />
              </b-progress>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col>Nuevas Preguntas
          <b-list-group>
            <b-list-group-item v-for="item in items" @click="getQuestion(item._id)">
              <b-button v-b-modal.modal1 variant="warning">{{ item.question }}</b-button>
              <b-progress class="mt-2" :max="max" show-value>
                <b-progress-bar :value="100*(6/10)" variant="success" />
                <b-progress-bar :value="80*(1.5/10)" variant="danger" />
              </b-progress>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
      <br><br><br>
      <b-row>
        <b-col>1 of 3</b-col>
        <b-col>
          <!--router-link to="dashboard">Volver al Dash</router-link-->
          <b-button  href="dashboard" variant="outline-dark">Volver al Dash</b-button>
        </b-col>
        <b-col>3 of 3</b-col>
      </b-row>
    </b-container>




    <div>
      <!-- Modal Component -->
      <b-modal id="modal1" :title="showQuestion.question" ok-title="De Acuerdo" ok-variant="success" cancel-title="En Desacuerdo" cancel-variant="danger">
        <p class="my-4">{{showQuestion.description}}</p>
      </b-modal>
    </div>
    <!-- <li v-for="item in items">
      <router-link name="getQuestion", params: { userId: item._id }>{{ item.question }}</router-link>
    </li> -->
-----------------
<!--  <div>
    Pregunta: {{showQuestion.question}}
    <br>
    Descripción: {{showQuestion.description}}
  </div>
  <button type=button class="btn btn-primary"  @click="clickMethod(showQuestion)">Votar</button>
-->

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
      },
      currQuestionResult: [],
      answerGroup: {
        trueCount: 0,
        falseCount: 0
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
    getQuestion(id) {
      console.log(id)
      var self = this;
        axios.get('http://localhost:3000/question/'+id, config).then(function (r){
          console.log('status:'+r.status+' data:'+r.data);
        if (r.status==200){
          console.log(r);
          self.showQuestion = r.data;
        } else {}
        })
    },
    getQuestionResults(id) {
      var self = this;
      axios.get('http://localhost:3000/question/group/'+id, config).then(function (r){
        self.currQuestionResult = r.data;
        self.groupQuestionResults();
      })
    },
    groupQuestionResults() {
      for (var i = 0; i < this.currQuestionResult.length; i++) {
        if (this.currQuestionResult[i].answer) {
          this.answerGroup.trueCount = this.answerGroup.trueCount+1;
        } else {
          this.answerGroup.falseCount = this.answerGroup.falseCount+1;
        }
      }
    },
    clickMethod(objQuestion) {
      var answer = {};
        if(confirm(objQuestion.question)) {
          answer = {
            question: objQuestion,
            answer: true
          }
        } else {
          answer = {
            question: objQuestion,
            answer: false
          }
        }
        axios.post('http://localhost:3000/answer', answer, config).then(function (r){
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
