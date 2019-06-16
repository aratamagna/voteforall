<template>
  <div>
  <div class="welcome-box">
    <div class="hhDDMc">
      <svg text-variant="black" class="fndDuH" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
        <g fill="none" fill-rule="evenodd" stroke="#007bff" stroke-width="2" transform="translate(1 1)">
          <path d="M20.8 20.8l6.4 6.4"></path>
          <path stroke-linecap="square" d="M35.2 12.8l-14.4 8-8 14.4 14.4-8z"></path>
          <circle cx="24" cy="24" r="24" stroke-linecap="square"></circle>
          <path stroke-linecap="square" d="M24 5.455v2.181M42.545 24h-2.181m-3.25 13.114L35.57 35.57M24 42.545v-2.181M5.455 24h2.181m3.25-13.114l1.543 1.543" opacity=".5"></path>
        </g>
      </svg>
    </div>
    <div class="gppOwl container">
      <div class="fYIFUv">¡Ya puedes hacer tu Encuesta y conocer el Sentir común de quienes votan!</div>
      <div class="cCsMsU">
        <p class="hpeTzd">Vote4All es una herramienta de libre disposición para crear y realizar encuestas y que su data pueda ser usada para llevar a cabo cambios reales, animate, vota, participa, haz un cambio.</p>
      </div>
    </div>
  </div>
  <div class="container">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      color="rgba(17, 51, 83, 0.6)"
      img-width="800"
      img-height="480"
      style="text-shadow: 1px 1px 2px rgba(17, 51, 83, 0.02);"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide v-for="item in items" caption="" img-blank img-alt="">
        <b-link :to="'question/'+item._id">
          <b-jumbotron style="max-height: 500px;" :header="item.question" :lead="item.description" bg-variant="primary" text-variant="black" border-variant="rgb(236, 239, 241)">
            <hr class="my-4">
            <b-button variant="danger" href="#">En Desacuerdo</b-button>
            <b-button variant="success" href="#">De Acuerdo</b-button>
          </b-jumbotron>
        </b-link>
      </b-carousel-slide>
    </b-carousel>
  </div>
    <p class="mt-4">
    </p>
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
    data() {
      return {
        slide: 0,
        sliding: null,
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
    methods: {
      listQuestions () {
      var self = this;
        axios.get(process.env.HOST_URL+'/pub/question').then(function (r){
        if (r.status==200 || r.status==304){
          self.items = r.data;
        } else {}
        })
      },
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    },
    mounted() {
      this.listQuestions();
    }
  }
</script>
