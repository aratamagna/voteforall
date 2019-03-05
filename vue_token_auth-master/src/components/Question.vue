<template>
  <div>
    <Header />

    <b-container class="bv-example-row">
      <b-row>
        <b-col>Tus Respuestas
          <b-list-group>
            <b-list-group-item v-for="item in items" @click="getQuestion(item._id)">
              <b-button v-b-modal.modal1 variant="dark">{{ item.question }}</b-button>
              <b-progress class="mt-2" show-value>
                <b-progress-bar :value="item.ok" variant="success" />
                <b-progress-bar :value="item.no" variant="danger" />
              </b-progress>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col>Nuevas Preguntas
          <b-list-group>
            <b-list-group-item v-for="item in items" @click="getQuestion(item._id)">
              <b-button v-b-modal.modal1 variant="warning">{{ item.question }}</b-button>
              <b-progress class="mt-2" show-value>
                <b-progress-bar :value="100*(6/10)" variant="success" />
                <b-progress-bar :value="80*(1.5/10)" variant="danger" />
              </b-progress>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
      <br><br><br>
      <b-row>
        <b-col></b-col>
        <b-col>
          <!--router-link to="dashboard">Volver al Dash</router-link-->
          <b-button  href="dashboard" variant="outline-dark">Volver al Dash</b-button>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>




    <div>
      <!-- Modal Component -->
      <b-modal id="modal1" :title="showQuestion.question" ok-title="De Acuerdo" @ok="agreeAnswer" ok-variant="success" cancel-title="En Desacuerdo" @cancel="disagreeAnswer" cancel-variant="danger">
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
        _id: '',
        question: '',
        description: '',
        tot: 0,
        ok: 0,
        no: 0,
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
      if (r.status==200 || r.status==304){
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
    getQuestionResults(id, cb) {
      var self = this;
      axios.get('http://localhost:3000/answer/group/'+id, config).then(function (r){
          return cb(r.data);
      })
    },
    agreeAnswer() {
      var self = this;
      axios.get('http://localhost:3000/answer/ok/'+this.showQuestion._id, config).then(function (r){
      })
    },
    disagreeAnswer() {
      var self = this;
      axios.get('http://localhost:3000/answer/no/'+this.showQuestion._id, config).then(function (r){
      })
    },
    /*
    /
    /
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
    /
    /
    */
  },
  mounted() {
    this.listQuestions();
  }
}
</script>
