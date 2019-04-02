<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide v-for="item in items" :caption="item.description" img-blank img-alt="Blank image">
        <h1>{{ item.question }}</h1>
        <p>
        </p>
      </b-carousel-slide>
    </b-carousel>

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
