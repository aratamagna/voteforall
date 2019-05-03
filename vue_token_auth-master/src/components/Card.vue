<template>
<div class="card mb-3">
  <div class="row no-gutters">
    <div class="col-md-4">
      <div class="row align-items-center">
        <div class="col">
          <div class="chart-wrap">
            <div id="chart">
              <apexchart type=donut width=200 :options="chartOptions" @colors="colors" :series="series" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{showQuestion.question}}</h5>
        <p class="card-text">
        {{showQuestion.description}}
        </p>
        <p class="card-text"><small class="text-muted"></small></p>
      </div>
      <div class="card-footer" v-if="isOpen">
        <button type="button" class="btn btn-danger">En Desacuerdo</button>
        <button type="button" class="btn btn-success">De Acuerdo</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import auth from '../router/auth'
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
      id: this.questionId,
      isOpen: this.open,
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
    }
  },
  props: {
    questionId: String,
    open: Boolean
  },
  components:{
    apexchart: VueApexCharts,
  },
  methods: {
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
    this.getQuestion(this.id);
  }
}
</script>
