<template>
  <div>
    <h2>Question</h2>
    <p v-if="$route.query.redirect">
      You need to login first.
    </p>
    <form @submit.prevent="ask">
      <label><input v-model="question" placeholder="Cual es la pregunta?"></label>
      <label><input v-model="description" placeholder="Haz una breve descripción de tu pregunta si ayuda a tus "></label> <br>
      <button type="submit">Publicar Pregunta.</button>
      <p v-if="error" class="error">hay algo en tu pregunta que lanza error.</p>
    </form>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  data () {
    return {
      question: '¿Hola Mundo?',
      description: 'Hallo!',
      error: false
    }
  },
  methods: {
    ask () {
      axios.post('localhost:3000/question', {question: this.question, description: this.description}).then(function (r){
      if (r.status==200){
        console.log(r)
      } else {}
      })
    }
  }
}
</script>

<style>
.error {
  color: red;
}
</style>
