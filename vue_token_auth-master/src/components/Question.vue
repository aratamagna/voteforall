<template>
  <div>
    <Header />

    <b-container class="bv-example-row">
      <b-row>
        <b-col>Tus Respuestas
          <b-list-group>
            <b-list-group-item v-for="item in items" :key="item.id" v-on:click="getQuestion(item._id)">
              <b-button v-b-modal.modal1 variant="dark">{{ item.question }}</b-button>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <!-- <b-col>Nuevas Preguntas
          <b-list-group>
            <b-list-group-item v-for="item in items" :key="item.id" @click="getQuestion(item._id)">
              <b-button v-b-modal.modal1 variant="warning">{{ item.question }}</b-button>

            </b-list-group-item>
          </b-list-group>
        </b-col> -->
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
        <b-progress class="mt-2" show-value>
          <b-progress-bar :value="100*(showQuestion.ok/showQuestion.tot)" variant="success" />
          <b-progress-bar :value="100*(showQuestion.no/showQuestion.tot)" variant="danger" />
        </b-progress>
        <p>De Acuerdo: {{showQuestion.ok}}</p>
        <p>En Desacuerdo: {{showQuestion.no}}</p>
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
    }
  },components:{
    Header
  },
  methods: {
    listQuestions () {
    var self = this;
      axios.get(process.env.HOST_URL+'/question', config).then(function (r){
      if (r.status==200 || r.status==304){
        self.items = r.data;
      } else {}
      })
    },
    getQuestion(id) {
      var self = this;
        axios.get(process.env.HOST_URL+'/question/'+id, config).then(function (r){
          console.log('status:'+r.status+' data:'+r.data);
        if (r.status==200){
          self.showQuestion = r.data;
          self.getQuestionResults(id);
        } else {}
        })
    },
    getQuestionResults(id) {
      var self = this;
      this.showQuestion.ok = 0;
      this.showQuestion.no = 0;
      axios.get(process.env.HOST_URL+'/answer/group/'+id, config).then(function (r){
        self.showQuestion.tot = r.data.length;
          for (var i = 0; i < r.data.length; i++) {
            if (r.data[i].answer==true) {
              self.showQuestion.ok = self.showQuestion.ok+1;
            } else {
              self.showQuestion.no = self.showQuestion.no+1;
            }
          }
          self.$forceUpdate();
      })
    },
    agreeAnswer() {
      var self = this;
      axios.get(process.env.HOST_URL+'/answer/ok/'+this.showQuestion._id, config).then(function (r){
      })
    },
    disagreeAnswer() {
      var self = this;
      axios.get(process.env.HOST_URL+'/answer/no/'+this.showQuestion._id, config).then(function (r){
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
        axios.post(process.env.HOST_URL+'/answer', answer, config).then(function (r){
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
