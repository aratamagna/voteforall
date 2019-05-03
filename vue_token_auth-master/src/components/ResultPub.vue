<template>
  <div>
    <Header/>
    <b-container class="bv-example-row">
      <div>
      <h1 class="display-4">{{showQuestion.question}}</h1>
      <p class="lead">{{showQuestion.description}}</p>
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

    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <div class="chart-wrap">
            <div id="chart">
              <apexchart type=donut width=380 :options="chartOptions" @colors="colors" :series="series" />
            </div>
          </div>
        </b-col>
        <b-col>2 of 3</b-col>
        <b-col>
          <apexchart type=radialBar width=380 :options="chartOptions" @colors="colors" :series="series" />
        </b-col>
      </b-row>
    </b-container>




  </div>
</template>

<script>
import auth from '../router/auth'
import Header from './Header.vue'
import VueApexCharts from 'vue-apexcharts'
const axios = require('axios');
let config = {
    headers: {
      'Authorization': 'Bearer ' + auth.getToken()
    },
    apexchart: VueApexCharts,
  }

export default {
  data() {
    return {
      componentKey: 0,
      items: [],
      showQuestion: {
        _id: '',
        question: '',
        description: '',
        tot: 0,
        ok: 0,
        no: 0,
      },
      chartOptions: {
        dataLabels: {
          enabled: false
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: false
            }
          }
        }],
        legend: {
            show: false,
            position: 'right',
            offsetY: 0,
            height: 0,
        }
      },
      series: [0,0,0,0],
      reactive: true,
      colors:['#E91E63', '#FFFFFF', '#9C27B0', '#000'],
    }
  },
  components:{
    Header,
    apexchart: VueApexCharts,
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
      this.showQuestion.ok = 0;
      this.showQuestion.no = 0;
      this.okCant = 0;
      this.noCant = 0;

      var self = this;
      axios.get(process.env.HOST_URL+'/pub/answer/group/'+id, config).then(function (r){
        self.showQuestion.tot = r.data.length;
          for (var i = 0; i < r.data.length; i++) {
            if (r.data[i].answer==true) {
              self.showQuestion.ok = self.showQuestion.ok+1;
            } else {
              self.showQuestion.no = self.showQuestion.no+1;
            }
          }
          self.okCant = 100 * ( self.showQuestion.ok / self.showQuestion.tot );
          self.noCant = 100 * ( self.showQuestion.no / self.showQuestion.tot );
          console.log("okCant: "+self.okCant+" ..noCant"+self.noCant);
          self.series = [0,self.okCant,0,self.noCant];
      })
    },
    agreeAnswer() {
      var self = this;
      axios.get(process.env.HOST_URL+'/pub/answer/ok/'+this.showQuestion._id, config).then(function (r){
        self.forceRerender();
      })
    },
    disagreeAnswer() {
      var self = this;
      axios.get(process.env.HOST_URL+'/pub/answer/no/'+this.showQuestion._id, config).then(function (r){
        self.forceRerender();
      })
    },
    appendData() {
      var arr = this.series.slice()
      arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1)
      this.series = arr
    },
    removeData() {
      if(this.series.length === 1) return
      var arr = this.series.slice()
      arr.pop()
      this.series = arr
    },
    randomize() {
      this.series = this.series.map(() => {
        return Math.floor(Math.random() * (100 - 1 + 1)) + 1
      })
    },
    reset() {
      this.series = [44, 55, 13, 33]
    },
    forceRerender() {
      this.componentKey += 1;
      this.getQuestion(this.$route.params.id);
    }
  },
  mounted() {
  this.showModal();
    this.getQuestion(this.$route.params.id);
  }
}
</script>
