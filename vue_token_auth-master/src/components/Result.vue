<template>
  <div>
    <b-container class="bv-example-row">
      <div>
      <b-jumbotron :header="showQuestion.question" :lead="showQuestion.description">
      <p></p>
      <p>De Acuerdo: {{showQuestion.ok}}</p>
      <p>En Desacuerdo: {{showQuestion.no}}</p>
      </b-jumbotron>
      </div>
    </b-container>
    <div>
      <!-- Modal Component -->
      <b-modal ref="myModalRef" :title="showQuestion.question" ok-title="De Acuerdo" @ok="agreeAnswer" ok-variant="success" cancel-title="En Desacuerdo" @cancel="disagreeAnswer" cancel-variant="danger">
        <p class="my-4">{{showQuestion.description}}</p>
        <b-progress class="mt-2" show-value>
          <b-progress-bar :value="100*(showQuestion.ok/showQuestion.tot)" variant="success" />
          <b-progress-bar :value="100*(showQuestion.no/showQuestion.tot)" variant="danger" />
        </b-progress>
      </b-modal>
    </div>
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
  },
  components:{
    Header
  },
  methods: {
    showModal() {
      this.$refs.myModalRef.show()
    },
    hideModal() {
      this.$refs.myModalRef.hide()
    },
    getQuestion(id) {
      var self = this;
        axios.get(process.env.HOST_URL+'/pub/question/'+id, config).then(function (r){
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
      axios.get(process.env.HOST_URL+'/pub/answer/group/'+id, config).then(function (r){
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
      axios.get(process.env.HOST_URL+'/pub/answer/ok/'+this.showQuestion._id, config).then(function (r){
      })
    },
    disagreeAnswer() {
      var self = this;
      axios.get(process.env.HOST_URL+'/pub/answer/no/'+this.showQuestion._id, config).then(function (r){
      })
    }
  },
  mounted() {
  this.showModal();
    this.getQuestion(this.$route.params.id);
  }
}
</script>
